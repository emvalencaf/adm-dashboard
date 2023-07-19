"use client";

// hooks
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// ui components
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// custom components
import { AlertModal } from "@/components/modals";

// data table
import { SizeColumn } from "../Columns";

// icons
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

// toast utils
import toast from "react-hot-toast";

// axios tools
import axios from "axios";

// interfaces
export interface ICellActionProps {
    data: SizeColumn;
}

const CellAction: React.FC<ICellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    // states
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Size id copied to the clipboard");
    };

    const onDelete = async () => {
        setIsLoading(true);

        try {
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);

            router.refresh();

            toast.success("Size deleted");
        } catch (error: any) {
            console.log("[CELLACTION-size] : ", error); // DEV LOG
            toast.error(
                "Make sure you removed all products using this size first."
            );
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    };

    console.log(`/${params.storeId}/sizes/${data.id}`);

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                isLoading={isLoading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            router.push(`/${params.storeId}/sizes/${data.id}`)
                        }
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CellAction;

"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../../../../../../../components/ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../../../../../../../components/ui/DropDownMenu";
import { BillboardColumn } from "../Columns";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "../../../../../../../components/modals";

// interfaces
export interface ICellActionProps {
    data: BillboardColumn;
}

const CellAction: React.FC<ICellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    // states
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Billboard id copied to the clipboard");
    };

    const onDelete = async () => {
        setIsLoading(true);

        try {
            await axios.delete(
                `/api/${params.storeId}/billboards/${data.id}`
            );

            router.refresh();

            toast.success("Billboard deleted");
        } catch (error: any) {
            console.log("[CELLACTION-billboard] : ", error); // DEV LOG
            toast.error(
                "Make sure you removed all categories using this billboard first."
            );
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    };

    console.log(`/${params.storeId}/billboards/${data.id}`);

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
                    <DropdownMenuItem>
                        <Edit
                            className="mr-2 h-4 w-4"
                            onClick={() =>
                                router.push(
                                    `/${params.storeId}/billboards/${data.id}`
                                )
                            }
                        />
                        Update
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

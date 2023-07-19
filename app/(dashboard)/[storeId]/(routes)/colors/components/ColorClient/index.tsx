"use client";

// hooks
import { useParams, useRouter } from "next/navigation";

// ui components
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

// custom components
import {Heading} from "@/components/ui/heading";
import {ApiList} from "@/components/ui/api-list";

// icons
import { Plus } from "lucide-react";

// interfaces
import { ColorColumn, columns } from "../Columns";

interface IColorClientProps {
    data: ColorColumn[];
}

const ColorClient: React.FC<IColorClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-ccenter ustify-between">
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage colors for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading
                title="API"
                description="API calls for Colors"
            />
            <Separator />
            <ApiList
                entityName="colors"
                entityIdName="colorId"
            />
        </>
    );
};

export default ColorClient;

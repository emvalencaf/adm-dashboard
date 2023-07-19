"use client";

// hooks
import { useParams, useRouter } from "next/navigation";

// ui components
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

// custom components
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/ui/api-list";

// icons
import { Plus } from "lucide-react";

// interfaces
import { BillboardColumn, columns } from "../Columns";

interface IBillboardClientProps {
    data: BillboardColumn[];
}

const BillboardClient: React.FC<IBillboardClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-ccenter ustify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage billboards for your store"
                />
                <Button
                    onClick={() =>
                        router.push(`/${params.storeId}/billboards/new`)
                    }
                >
                    <Plus className="" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading title="API" description="API calls for Billboards" />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    );
};

export default BillboardClient;

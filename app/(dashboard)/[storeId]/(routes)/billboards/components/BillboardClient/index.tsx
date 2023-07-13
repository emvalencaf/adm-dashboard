"use client";

// hooks
import { useParams, useRouter } from "next/navigation";

// ui components
import { Button } from "../../../../../../../components/ui/Button";
import { DataTable } from "../../../../../../../components/ui/DataTable";
import { Separator } from "../../../../../../../components/ui/Separator";

// custom components
import Heading from "../../../../../../../components/ui/Heading";
import ApiList from "../../../../../../../components/ui/ApiList";

// icons
import { Plus } from "lucide-react";

// interfaces
import { BillboardColumn, columns } from "../Columns";

interface IBillboardClientProps {
    data: BillboardColumn[];
}

const BillboardClient: React.FC<IBillboardClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-ccenter ustify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage billboards for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading
                title="API"
                description="API calls for Billboards"
            />
            <Separator />
            <ApiList
                entityName="billboards"
                entityIdName="billboardId"
            />
        </>
    );
};

export default BillboardClient;

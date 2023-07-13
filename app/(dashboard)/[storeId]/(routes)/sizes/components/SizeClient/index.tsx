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
import { SizeColumn, columns } from "../Columns";

interface ISizeClientProps {
    data: SizeColumn[];
}

const SizeClient: React.FC<ISizeClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-ccenter ustify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage sizes for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading
                title="API"
                description="API calls for Sizes"
            />
            <Separator />
            <ApiList
                entityName="sizes"
                entityIdName="sizeId"
            />
        </>
    );
};

export default SizeClient;

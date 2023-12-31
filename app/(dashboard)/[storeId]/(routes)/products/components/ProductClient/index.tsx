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
import { ProductColumn, columns } from "../Columns";

interface IProductClientProps {
    data: ProductColumn[];
}

const ProductClient: React.FC<IProductClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-ccenter ustify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading
                title="API"
                description="API calls for Products"
            />
            <Separator />
            <ApiList
                entityName="products"
                entityIdName="productId"
            />
        </>
    );
};

export default ProductClient;

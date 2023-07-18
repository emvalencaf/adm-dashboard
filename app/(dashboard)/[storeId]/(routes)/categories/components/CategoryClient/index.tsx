"use client";

// hooks
import { useParams, useRouter } from "next/navigation";

// ui components
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { Separator } from "@/components/ui/Separator";

// custom components
import Heading from "@/components/ui/Heading";
import ApiList from "@/components/ui/ApiList";

// icons
import { Plus } from "lucide-react";

// interfaces
import { CategoryColumn, columns } from "../Columns";

interface ICategoryClientProps {
    data: CategoryColumn[];
}

const CategoryClient: React.FC<ICategoryClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-ccenter ustify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading
                title="API"
                description="API calls for Categories"
            />
            <Separator />
            <ApiList
                entityName="categories"
                entityIdName="categoryId"
            />
        </>
    );
};

export default CategoryClient;

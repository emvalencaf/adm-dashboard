"use client";

import { Plus } from "lucide-react";
import Heading from "../../../../../../../components/ui/Heading";
import { Separator } from "../../../../../../../components/ui/Separator";
import { Button } from "../../../../../../../components/ui/Button";
import { useParams, useRouter } from "next/navigation";

// interfaces

const BillboardClient: React.FC = ({}) => {

    const router = useRouter();
    const params = useParams();



    return (
        <>
            <div className="flex items-ccenter ustify-between">
                <Heading
                    title="Billboards (0)"
                    description="Manage billboards for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="" />
                    Add new
                </Button>
            </div>
            <Separator />
        </>
    );
};

export default BillboardClient;

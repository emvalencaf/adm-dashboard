"use client";

// ui components
import { DataTable } from "../../../../../../../components/ui/DataTable";
import { Separator } from "../../../../../../../components/ui/Separator";

// custom components
import Heading from "../../../../../../../components/ui/Heading";

// interfaces
import { OrderColumn, columns } from "../Columns";

interface IOrderClientProps {
    data: OrderColumn[];
}

const OrderClient: React.FC<IOrderClientProps> = ({ data }) => {

    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey="product" />
        </>
    );
};

export default OrderClient;

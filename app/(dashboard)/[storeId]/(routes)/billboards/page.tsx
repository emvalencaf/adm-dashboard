// date tools
import { format } from 'date-fns';

// prisma tool
import prismadb from "../../../../../lib/prisma";

// custom components
import { BillboardClient } from "./components";

// interfaces
import { BillboardColumn } from "./components/Columns";

interface IBillboardsPageProps {
    params: {
        storeId: string;
    };
}

const BillboadsPage: React.FC<IBillboardsPageProps> = async ({
    params,
}) => {

    const {
        storeId
    } = params;

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    );
}

export default BillboadsPage;
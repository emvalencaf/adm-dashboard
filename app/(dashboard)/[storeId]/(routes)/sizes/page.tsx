// date tools
import { format } from 'date-fns';

// prisma tool
import prismadb from "../../../../../lib/prisma";

// custom components
import { SizeClient } from "./components";

// interfaces
import { SizeColumn } from "./components/Columns";

interface ISizesPageProps {
    params: {
        storeId: string;
    };
}

const SizesPage: React.FC<ISizesPageProps> = async ({
    params,
}) => {

    const {
        storeId
    } = params;

    const sizes = await prismadb.size.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    );
}

export default SizesPage;
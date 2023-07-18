// date tools
import { format } from 'date-fns';

// prisma tool
import prismadb from "@/lib/prisma";

// custom components
import { ColorClient } from "./components";

// interfaces
import { ColorColumn } from "./components/Columns";

interface IColorPageProps {
    params: {
        storeId: string;
    };
}

const ColorPage: React.FC<IColorPageProps> = async ({
    params,
}) => {

    const {
        storeId
    } = params;

    const colors = await prismadb.color.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const formattedColor: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data={formattedColor} />
            </div>
        </div>
    );
}

export default ColorPage;
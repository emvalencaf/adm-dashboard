// date tools
import { format } from 'date-fns';

// prisma tool
import prismadb from "../../../../../lib/prisma";

// custom components
import { CategoryClient } from "./components";

// interfaces
import { CategoryColumn } from "./components/Columns";

interface ICategoriesPageProps {
    params: {
        storeId: string;
    };
}

const CategoriesPage: React.FC<ICategoriesPageProps> = async ({
    params,
}) => {

    const {
        storeId
    } = params;

    const categories = await prismadb.category.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            billboard: true,
        },
    });

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    );
}

export default CategoriesPage;
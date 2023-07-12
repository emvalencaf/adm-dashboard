import prismadb from "../../../../lib/prisma";

interface IDashboardProps { 
    params: {
        storeId: string;
    };
}

const DashboardPage: React.FC<IDashboardProps>  = async ({
    params,
}) => {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });

    return (
        <div>
            This is a Dashboard!
        </div>
    );
}

export default DashboardPage;
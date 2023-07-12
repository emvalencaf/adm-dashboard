import { UserButton, auth } from "@clerk/nextjs";

// internal custom components
import { MainNav, StoreSwitcher } from "./components";
import { redirect } from "next/navigation";
import prismadb from "../../lib/prisma";


const Navbar: React.FC = async () => {

    const { userId } = auth();
    
    if (!userId) redirect('/sign-in');

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
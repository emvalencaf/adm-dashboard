import { UserButton, auth } from "@clerk/nextjs";

// internal custom components
import { MainNav, StoreSwitcher } from "@/components/Navbar/components";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prisma";
import { ThemeToggle } from "@/components/ui/ThemeToggle";


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
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
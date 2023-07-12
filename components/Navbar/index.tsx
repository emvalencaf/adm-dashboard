import { UserButton } from "@clerk/nextjs";

// internal custom components
import { MainNav } from "./components";


const Navbar: React.FC = () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div>
                    This will be a store switcher
                </div>
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
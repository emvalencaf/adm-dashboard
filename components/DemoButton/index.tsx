"use client";

import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { demoAccount } from "@/constants";
import { useState } from "react";

console.log(demoAccount);

const DemoButton: React.FC = () => {

    const router = useRouter();

    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { signIn, isLoaded, setActive } = useSignIn();

    const handleSignIn = async () => {

        setIsLoading(true);
        try {

            if (!isLoaded) return;

            const result = await signIn.create({
                identifier: demoAccount.email,
                password: demoAccount.password,
            });


            if (result.status !== "complete") return console.log(result);

            await setActive({ session: result.createdSessionId, });

            router.push("/");
            
        } catch (error: any) {
            console.log("[DEMOBUTTON]: ", error);
            toast.error('Something went wrong with sign-in with a demo account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="width-[25rem] max-w-[calc(100vw - 5rem)]">
    <Button disabled={isLoading} onClick={handleSignIn} className="cl-formButtonPrimary 🔒️ cl-internal-1fsg6zy bg-[#103FEF]">
        {isLoading ? "Signing in with demo account..." : "Sign-in with Demo Account"}
    </Button>

    </div>
    );
};

export default DemoButton;

import { SignIn } from "@clerk/nextjs";
import DemoButton from "../../../../../components/DemoButton";
import { demoAccount } from "../../../../../constants";

export default function Page() {
    return (
        <>
            <SignIn />
            {/* Only for dev amb */}
            <DemoButton />
        </>
    );
}

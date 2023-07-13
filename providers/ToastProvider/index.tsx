"use client";

// providers
import { Toaster } from "react-hot-toast";

// custom components
import ClientComponent  from "@/components/ClientComponent";

const ToastProvider: React.FC = () => {

    return (
        <ClientComponent>
            <Toaster />
        </ClientComponent>
    );
}

export default ToastProvider;
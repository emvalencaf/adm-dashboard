"use client";

import { useEffect, useState } from "react";


import { StoreModal } from "@/components/modals";
import { Toaster } from "react-hot-toast";

const ToastProvider: React.FC = () => {

    // states
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <>
            <Toaster />
        </>
    );
}

export default ToastProvider;
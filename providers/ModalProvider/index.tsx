"use client";

import { useEffect, useState } from "react";


import { StoreModal } from "@/components/modals";

const ModalProvider: React.FC = () => {

    // states
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <>
            <StoreModal />
        </>
    );
}

export default ModalProvider;
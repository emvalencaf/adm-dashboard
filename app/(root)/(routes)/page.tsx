"use client";

import { useStore } from "zustand";
import { useStoreModal } from "../../../hooks";
import { useEffect } from "react";

const SetupPage = () => {
    
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!isOpen) onOpen();
    }, [isOpen, onOpen]);
    
    return (
        <div className="p-4">

        </div>
    );
};

export default SetupPage;

'use client';

// hooks
import { useEffect, useState } from "react";

// interfaces
export interface IClientComponentProps {
    children: React.ReactNode;
};

const ClientComponent: React.FC<IClientComponentProps> = ({ children }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    return (
        <>
            {children}
        </>
    );
};

export default ClientComponent;

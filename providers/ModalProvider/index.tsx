"use client";

// custom components
import { StoreModal } from "@/components/modals";
import ClientComponent from "../../components/ClientComponent";

const ModalProvider: React.FC = () => {

    return (
        <ClientComponent>
            <StoreModal />
        </ClientComponent>
    );
}

export default ModalProvider;
"use client";

// hooks
import { useEffect, useState } from "react";

// ui components
import { Button } from "@/components/ui/Button";

// custom components
import Modal from "@/components/ui/Modal";
import ClientComponent from "@/components/ClientComponent";

// interfaces
interface IAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const AlertModal: React.FC<IAlertModalProps> = ({
    isOpen,
    isLoading,
    onClose,
    onConfirm,
}) => {
    return (
        <ClientComponent>
            <Modal
                title="Are you sure?"
                description="This action cannot be undone."
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                        disabled={isLoading}
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        Continue
                    </Button>
                </div>
            </Modal>
        </ClientComponent>
    );
};

export default AlertModal;

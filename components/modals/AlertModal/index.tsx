"use client";

// ui components
import { Button } from "@/components/ui/button";

// custom components
import ClientComponent from "@/components/ClientComponent";
import { Modal } from "@/components/ui/modal";

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

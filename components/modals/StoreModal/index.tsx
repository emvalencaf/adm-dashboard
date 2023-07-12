"use client";

// zod and form tools
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// hooks
import { useState } from "react";

// custom hooks
import { useStoreModal } from "@/hooks";

// custom modal
import Modal from "@/components/ui/Modal";

// axios
import axios from "axios";

// ui components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";

// toast
import { toast } from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),
});

const StoreModal: React.FC = () => {
    // store modal controller
    const storeModal = useStoreModal();

    // states
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        setIsLoading(true);

        try {
        
            const response = await axios.post('/api/stores', values);
            console.log("[STORE MODAL] :", response.data); // DEV CONSOLE

            window.location.assign(`/${response.data.id}`);

        } catch (error: any) {
            console.log("[STORE MODAL] :", error); // DEV CONSOLE
            toast.error("Somethingg went wrong.");
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                placeholder="E-commmerce"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default StoreModal;

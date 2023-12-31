"use client";

// hooks
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// axios tools
import axios from "axios";

// toast tools
import { toast } from "react-hot-toast";

// ui components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// custom components
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals";

// icons
import { Trash } from "lucide-react";

// form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

// interfaces
import { Size } from "@prisma/client";

interface ISizeFormProps {
    initialData: Size | null;
}

const SizeForm: React.FC<ISizeFormProps> = ({ initialData }) => {
    // params
    const params = useParams();
    const router = useRouter();

    // states
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit a size" : "Add a new size";
    const toastMessage = initialData ? "Size updated" : "Size created.";
    const action = initialData ? "Save change" : "Create";

    // form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        },
    });

    const onSubmit = async (data: SizeFormValues) => {
        setIsLoading(true);

        try {
            console.log("[SIZEFORM]:", data); // DEV LOG

            initialData
                ? await axios.patch(
                      `/api/${params.storeId}/sizes/${params.sizeId}`,
                      data
                  )
                : await axios.post(`/api/${params.storeId}/sizes`, data);

            router.refresh();
            router.push(`/${params.storeId}/sizes`);

            toast.success(toastMessage);
        } catch (error: any) {
            console.log("[SIZEFORM] : ", error);

            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        setIsLoading(true);

        try {
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);

            router.refresh();
            router.push(`/${params.storeId}/sizes`);

            toast.success("Size deleted");
        } catch (error: any) {
            console.log("[SIZEFORM] : ", error); // DEV LOG
            toast.error(
                "Make sure you removed all categories using this size first."
            );
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                isLoading={isLoading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Size name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Value"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default SizeForm;

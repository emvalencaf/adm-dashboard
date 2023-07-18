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
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

// custom components
import Heading from "@/components/ui/Heading";
import { AlertModal } from "@/components/modals";

// icons
import { Trash } from "lucide-react";

// form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

// interfaces
import { Billboard } from "@prisma/client";
import ImageUpload from "../../../../../../../../components/ui/ImageUpload";

interface IBillboardFormProps {
    initialData: Billboard | null;
}

const BillboardForm: React.FC<IBillboardFormProps> = ({ initialData }) => {
    // params
    const params = useParams();
    const router = useRouter();

    // states
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const title = initialData ? "Edit bilboard" : "Create billboard";
    const description = initialData
        ? "Edit a billboard"
        : "Add a new billboard";
    const toastMessage = initialData
        ? "Billboard updated"
        : "Billboard created.";
    const action = initialData ? "Save change" : "Create";

    // form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        },
    });

    const onSubmit = async (data: CategoryFormValues) => {
        setIsLoading(true);

        try {
            console.log("[SETTINGFORM]:", data); // DEV LOG
            
            initialData ?    
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
                : await axios.post(`/api/${params.storeId}/billboards`, data);

            router.refresh();
            router.push(`/${params.storeId}/billboards`);

            toast.success(toastMessage);
        } catch (error: any) {
            console.log("[BILLBOARDFORM] : ", error);

            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        setIsLoading(true);

        try {
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);

            router.refresh();
            router.push(`/${params.storeId}/billboards`);

            toast.success("Billboard deleted");
        } catch (error: any) {
            console.log("[BILLBOARDFORM] : ", error); // DEV LOG
            toast.error(
                "Make sure you removed all categories using this billboard first."
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
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={isLoading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Billboard label"
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

export default BillboardForm;

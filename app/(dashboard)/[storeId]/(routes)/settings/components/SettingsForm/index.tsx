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
import { Button } from "../../../../../../../components/ui/Button";
import { Separator } from "../../../../../../../components/ui/Separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../../../../components/ui/Form";
import { Input } from "../../../../../../../components/ui/Input";

// custom components
import Heading from "../../../../../../../components/ui/Heading";

// icons
import { Trash } from "lucide-react";

// form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

// interfaces
import { Store } from "@prisma/client";
import { AlertModal } from "../../../../../../../components/modals";
import ApiAlert from "../../../../../../../components/ui/ApiAlert";

interface ISettingsFormProps {
    initialData: Store;
}

const SettingsForm: React.FC<ISettingsFormProps> = ({ initialData }) => {

    // params
    const params = useParams();
    const router = useRouter();

    // states
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: SettingsFormValues) => {

        setIsLoading(true);

        try {
            console.log("[SETTINGFORM]:", data); // DEV LOG
            await axios.patch(`/api/stores/${params.storeId}`, data);

            router.refresh();

            toast.success("Store updated.");
        } catch (error: any) {
            console.log("[SETTINGSFORM] : ", error);
            
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        
        setIsLoading(true);
        
        try {
            
            await axios.delete(`/api/stores/${params.storeId}`);

            router.refresh();
            router.push("/");

            toast.success("Store deleted");

        } catch (error: any) {
            console.log("[SETTINGSFORM] : ", error) // DEV LOG
            toast.error("Make sure you removed all products and categories first.");
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                isLoading={isLoading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage tore preferences"
                />
                <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({ field}) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder="Store name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={isLoading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert title="test" description="test-desc" />
        </>
    );
};

export default SettingsForm;

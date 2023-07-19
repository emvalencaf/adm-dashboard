"use client";

// hooks
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// custom hooks
import { useStoreModal } from "@/hooks";

// ui components
import { PopoverTrigger } from "@radix-ui/react-popover";

import { Popover, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

// icons
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";

// interfaces
import { Store } from "@prisma/client";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;

interface IStoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

const StoreSwitcher: React.FC<IStoreSwitcherProps> = ({ items = [], className }) => {
    // states
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    // formating item
    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    // to find out the selected item
    const currentStore = formattedItems.find(
        (item) => item.value === params.storeId
    );

    // controller
    const [open, setOpen] = useState<boolean>(false);

    const onStoreSelect = (store: { value: string; label: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>
                            No store found.
                        </CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem key={store.value} onSelect={() => onStoreSelect(store)}
                                className="text-sm"
                                >
                                    {store.label}
                                    <Check
                                        className={cn("ml-auto h-4 w-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                storeModal.onOpen();
                            }}
                        >
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create Store
                        </CommandItem>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default StoreSwitcher;

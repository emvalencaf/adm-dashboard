import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../Alert";
import { Badge, BadgeProps } from "../Badge";
import { Button } from "../Button";
import toast from "react-hot-toast";

// interfaces
interface IApiAlertProps {
   title: string;
   description: string;
   variant: "public" | "admin"; 
}

const textMap: Record<IApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
};

const varientMap: Record<IApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
};

const ApiAlert: React.FC<IApiAlertProps> = ({
    title,
    description,
    variant = "public",
}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("API route copied to the clipboard");
    }

    return (
        <Alert>
            <Server className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={varientMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center gap-x-2">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button size="icon" variant="outline" onClick={onCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
            </AlertDescription>
        </Alert>
    );
}

export default ApiAlert;
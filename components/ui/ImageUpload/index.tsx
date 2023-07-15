"use client";

// next tool
import Image from "next/image";

// next cloudinary
import { CldUploadWidget } from "next-cloudinary";

// ui components
import { Button } from "../Button";

// custom components
import ClientComponent from "../../ClientComponent";

// icons
import { ImagePlus, Trash } from "lucide-react";

// interfaces
export interface IImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<IImageUploadProps> = ({
    disabled,
    onRemove,
    onChange,
    value,
}) => {
    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    return (
        <ClientComponent>
            <div>
                <div className="mb-4 flex items-center gap-4">
                    {value.map((url) => (
                        <div
                            key={url}
                            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                        >
                            <div className="z-10 absolute top-2 riht-2">
                                <Button
                                    type="button"
                                    onClick={() => onRemove(url)}
                                    variant="destructive"
                                    size="icon"
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Image"
                                src={url}
                            />
                        </div>
                    ))}
                </div>
                <CldUploadWidget onUpload={onUpload} uploadPreset="ntpjtrzh">
                    {({ open }) => {
                        const onClick = () => {
                            open();
                        };

                        return (
                            <Button
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onClick}
                            >
                                <ImagePlus className="h-4 w-4 mr-2" />
                                Upload an image
                            </Button>
                        );
                    }}
                </CldUploadWidget>
            </div>
        </ClientComponent>
    );
};

export default ImageUpload;

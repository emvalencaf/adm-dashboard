export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-5 items-center justify-center h-full w-full">
            {children}
        </div>
    );
}

// actions
import { getGraphRevenue, getSaleCount, getStockCount, getTotalRevenue } from "@/actions";

// ui componens
import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";

// icons
import { CreditCard, DollarSign, Package } from "lucide-react";

// utils
import { formatter } from "@/lib/utils";
import Overview from "@/components/ui/Overview";

interface IDashboardProps {
    params: {
        storeId: string;
    };
}

const DashboardPage: React.FC<IDashboardProps> = async ({ params }) => {
    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSaleCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphRevenue = await getGraphRevenue(params.storeId);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading
                    title="Dashboard"
                    description="Overview of your store"
                />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-betwen space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-betwen space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{salesCount}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-betwen space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Products in Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stockCount}</div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>
                            Overview
                        </CardTitle>
                        <CardContent className="pl-2">
                            <Overview data={graphRevenue} />
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;

// date tools
import { format } from 'date-fns';

// prisma tool
import prismadb from "@/lib/prisma";

// custom components
import { OrderClient } from "./components";

// interfaces
import { OrderColumn } from "./components/Columns";
import { formatter } from '@/lib/utils';

interface IOrdersPageProps {
    params: {
        storeId: string;
    };
}

const BillboadsPage: React.FC<IOrdersPageProps> = async ({
    params,
}) => {

    const {
        storeId
    } = params;

    const orders = await prismadb.order.findMany({
        where: {
            storeId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
          return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
      }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
}

export default BillboadsPage;
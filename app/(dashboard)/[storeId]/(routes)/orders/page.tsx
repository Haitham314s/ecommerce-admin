import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import OrderClient from "./components/Client";
import { OrderColumn } from "./components/Columns";

interface OrdersPageProps {
  params: { storeId: string };
}

async function OrdersPage({ params: { storeId } }: OrdersPageProps) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM dd, yyyy") as string,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}

export default OrdersPage;

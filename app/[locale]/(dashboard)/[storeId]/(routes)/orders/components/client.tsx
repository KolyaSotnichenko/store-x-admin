"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";
import { useTranslations } from "next-intl";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const t = useTranslations();

  return (
    <>
      <Heading title="Orders.title" subtitle="Orders.subtitle" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};

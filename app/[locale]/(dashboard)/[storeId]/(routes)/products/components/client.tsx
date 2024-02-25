"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";
import { useTranslations } from "next-intl";
import { PremiumCard } from "@/components/premium-card";
import { useUser } from "@clerk/nextjs";

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const t = useTranslations();
  const { user } = useUser();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Products.title" subtitle="Products.subtitle" />
        {!user?.publicMetadata.premium && data.length >= 1 ? (
          <Button onClick={() => router.push("https://t.me/Kolya_Sotnichenko")}>
            {t("General.get_premium")}
          </Button>
        ) : (
          <Button
            onClick={() => router.push(`/${params.storeId}/products/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> {t("General.add_btn")}
          </Button>
        )}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {user?.publicMetadata.premium ? (
        <>
          <Heading
            title="Products.api_title"
            subtitle="Products.api_subtitle"
          />
          <Separator />
          <ApiList entityName="products" entityIdName="productId" />
        </>
      ) : (
        <div className="w-full flex justify-center">
          <PremiumCard />
        </div>
      )}
    </>
  );
};

"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, BillboardColumn } from "./columns";
import { useTranslations } from "use-intl";
import { useUser } from "@clerk/nextjs";
import { PremiumCard } from "@/components/premium-card";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();
  const { user } = useUser();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Billboards.title`} subtitle="Billboards.subtitle" />
        {!user?.publicMetadata.premium && data.length >= 1 ? (
          <Button onClick={() => router.push("https://t.me/Kolya_Sotnichenko")}>
            {t("General.get_premium")}
          </Button>
        ) : (
          <Button
            onClick={() => router.push(`/${params.storeId}/billboards/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> {t("General.add_btn")}
          </Button>
        )}
        {user?.publicMetadata.premium ? (
          <Button
            onClick={() => router.push(`/${params.storeId}/billboards/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> {t("General.add_btn")}
          </Button>
        ) : null}
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      {user?.publicMetadata.premium ? (
        <>
          <Heading
            title="Billboards.api_title"
            subtitle="Billboards.api_subtitle"
          />
          <Separator />

          <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
      ) : (
        <div className="w-full flex justify-center">
          <PremiumCard />
        </div>
      )}
    </>
  );
};

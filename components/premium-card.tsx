"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const notifications = [
  {
    title: "unlimited_stores",
  },
  {
    title: "unlimited_products",
  },
  {
    title: "unlimited_categories",
  },
  {
    title: "unlimited_billboard",
  },
  {
    title: "api_for_your_custom_web_apps",
  },
  {
    title: "be_the_first_to_receive_new_updates_and_features",
  },
];

type PremiumCardProps = React.ComponentProps<typeof Card>;

export function PremiumCard({ className, ...props }: PremiumCardProps) {
  const t = useTranslations("PremiumCard");
  const router = useRouter();

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {t(notification.title)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => router.push("https://t.me/Kolya_Sotnichenko")}
          className="w-full"
        >
          <Check className="mr-2 h-4 w-4" /> {t("get_premium")}
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import * as z from "zod";
import axios from "axios";
import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Store } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import TooltipInfo from "@/components/tooltipInfo";
import TipTap from "./Tiptap";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  botToken: z.string().min(43).max(46),
  appUrl: z.string().min(10),
  botWelcomeText: z.string().min(50),
});

type BotFormValues = z.infer<typeof formSchema>;

interface BotFormProps {
  initialData: Store;
}

const BotForm: FC<BotFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const t = useTranslations("Bot");

  const [loading, setLoading] = useState(false);

  const form = useForm<BotFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: BotFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/${params.storeId}/bot`, data);
      router.refresh();
      toast.success("Store updated.");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Bot.title" subtitle="Bot.subtitle" />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="appUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-x-2">
                    <FormLabel>{t("web_app_url")}</FormLabel>
                    <TooltipInfo info={t("tooltip_info")} />
                  </div>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="https://your-store.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="botToken"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-x-2">
                    <FormLabel>{t("token")}</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Bot token"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="botWelcomeText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("welcome_text")}</FormLabel>
                <FormControl>
                  <TipTap content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {t("save_changes")}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default BotForm;

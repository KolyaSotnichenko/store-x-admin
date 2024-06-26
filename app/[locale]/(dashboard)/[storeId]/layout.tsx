import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import LocaleProvider from "@/providers/locale-provider";
import { getMessages, getTimeZone } from "next-intl/server";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string; locale: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar botName={store.botName} />
      {children}
    </>
  );
}

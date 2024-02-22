import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import AppBtn from "./app-btn";
import { LocaleToggle } from "./locale-toggle";
import { locales } from "@/config";
import { getTranslations } from "next-intl/server";

const Navbar = async ({ botName }: { botName: string }) => {
  const { userId } = auth();
  const t = await getTranslations("General");

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {botName && <AppBtn botName={botName} />}
          {/* <PaymentButton /> */}

          <ThemeToggle />
          <LocaleToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { ExternalLinkIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const AppBtn = async ({ botName }: { botName: string }) => {
  const t = await getTranslations("Navbar");

  return (
    <Link
      href={`https://t.me/${botName}`}
      target="_blank"
      className="flex items-center gap-x-2 text-sm"
    >
      <span>{t("open_bot")}</span> <ExternalLinkIcon />
    </Link>
  );
};

export default AppBtn;

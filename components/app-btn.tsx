import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

const AppBtn = async ({ botName }: { botName: string }) => {
  return (
    <Link
      href={`https://t.me/${botName}`}
      target="_blank"
      className="flex items-center gap-x-2 text-sm"
    >
      <span>Open Bot</span> <ExternalLinkIcon />
    </Link>
  );
};

export default AppBtn;

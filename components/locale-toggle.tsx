"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function LocaleToggle() {
  const router = useRouter();

  function onSelectChange(newLocale: string): void {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GlobeIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSelectChange("en")}>
          EN
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange("ua")}>
          UA
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

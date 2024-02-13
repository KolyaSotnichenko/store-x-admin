"use client";

import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Info } from "lucide-react";

const TooltipInfo: FC<{ info: string }> = ({ info }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info className="h-4" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipInfo;

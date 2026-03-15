import React from "react";
import { cn } from "@/lib/utils";

const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={cn("w-full max-w-298 px-4 md:px-8 mx-auto relative container", className)}>{children}</div>;
};

export default Container;

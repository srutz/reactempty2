import { ReactNode } from "react";
import { cn } from "./Util";

export function Box({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={cn("bg-black p-8 rounded-xl border border-gray-600 flex flex-col gap-2", className)}>
            {children}
        </div>
    )
}
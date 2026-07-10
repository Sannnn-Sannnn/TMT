import { MoonStar, Sun } from "lucide-react";

import { useTheme } from "@/hooks/useTheme.ts";

export default function Header() {
    const { isDark, toggle } = useTheme();

    return (
        <div className="flex items-center justify-between pl-10 pr-10 h-1/14 w-screen bg-primary">
            <div className={"font-heading font-medium text-primary-foreground text-4xl"}>
                TMT
            </div>
            <div onClick={toggle}>
                {isDark ? (
                    <MoonStar className={"h-8 w-8 text-primary-foreground"} />
                ) : (
                    <Sun className={"h-8 w-8 text-primary-foreground"} />
                )}
            </div>
        </div>
    )
}
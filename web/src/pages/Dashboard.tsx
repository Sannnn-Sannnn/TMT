import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx";

import { useTheme } from "@/hooks/useTheme.ts"

export default function Dashboard() {
    const {isDark, toggle} = useTheme()

    return (
        <div className="flex h-screen w-screen p-5 gap-x-5">
            <Card className={"flex flex-col flex-1 p-5 gap-y-5"}>
                <Button onClick={toggle}>
                    {isDark ? "Modo oscuro" : "Modo claro"}
                </Button>
                <Input></Input>
            </Card>
            <Card className={"flex flex-col flex-1 p-5 gap-y-5"}>
                <div className={"flex items-center justify-center p-5 bg-today-dark"}>
                    <div className={"h-5 w-full bg-today"}/>
                </div>
                <div className={"flex gap-x-5"}>
                    <div className={"w-10 h-10 rounded-full bg-today-dark"}/>
                    <div className={"w-10 h-10 rounded-full bg-today"}/>
                    <div className={"w-10 h-10 rounded-full bg-week"}/>
                    <div className={"w-10 h-10 rounded-full bg-month"}/>
                    <div className={"w-10 h-10 rounded-full bg-overdue"}/>
                </div>
                <div className="flex flex-col gap-4 p-6 max-w-md">
                    <div className="rounded-lg bg-primary text-primary-foreground p-4">Primary / Primary Foreground</div>
                    <div className="rounded-lg bg-secondary text-secondary-foreground p-4">Secondary / Secondary Foreground</div>
                    <div className="rounded-lg bg-muted text-muted-foreground p-4">Muted / Muted Foreground</div>
                    <div className="rounded-lg bg-accent text-accent-foreground p-4">Accent / Accent Foreground</div>
                </div>
            </Card>
            <Card className={"flex flex-col flex-1 p-5 gap-y-5"} />
        </div>
    )
}
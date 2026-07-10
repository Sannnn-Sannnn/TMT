import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx";

import { useTheme } from "@/hooks/useTheme"
import Header from "@/components/ui/Header.tsx";

export default function Playground() {
    const {isDark, toggle} = useTheme()

    return (
        <div className="flex flex-col h-screen w-screen">
            <Header />
            <main className={"flex h-full w-full gap-x-5 p-5"}>
                <Card className={"flex flex-col flex-1 p-5 gap-y-5 border"}>
                    <Button onClick={toggle}>
                        {isDark ? "Modo oscuro" : "Modo claro"}
                    </Button>
                    <Input />
                </Card>
                <Card className={"flex flex-col flex-1 p-5 gap-y-5 border"}>
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
                        <div className="rounded-lg bg-primary text-primary-foreground p-4">
                            <div className={"font-heading text-4xl"}>Primary</div>
                            <div className={"text-lg"}>Primary Foreground</div>
                        </div>
                        <div className="rounded-lg bg-secondary text-secondary-foreground p-4">
                            <div className={"font-heading text-4xl"}>Secondary</div>
                            <div className={"text-lg"}>Secondary Foreground</div>
                        </div>
                        <div className="rounded-lg bg-muted text-muted-foreground p-4">
                            <div className={"font-heading text-4xl"}>Muted</div>
                            <div className={"text-lg"}>Muted Foreground</div>
                        </div>
                        <div className="rounded-lg bg-accent text-accent-foreground p-4">
                            <div className={"font-heading text-4xl"}>Accent</div>
                            <div className={"text-lg"}>Accent Foreground</div>
                        </div>
                    </div>
                </Card>
                <Card className={"flex flex-col flex-1 p-5 gap-y-5 border"} />
            </main>
        </div>
    )
}
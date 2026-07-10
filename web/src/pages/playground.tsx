import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx";

import Header from "@/components/ui/Header.tsx";

export default function Playground() {

    return (
        <div className="flex flex-col h-screen w-screen">
            <Header />
            <main className={"flex h-full w-full gap-x-5 p-5"}>

                { /* Components */ }
                <Card className={"flex flex-col flex-1 p-5 gap-y-5 border"}>
                    <Button className={"font-body font-medium text-xl p-5"}>
                        Button
                    </Button>
                    <Input />
                </Card>

                { /* Colours */ }
                <Card className={"flex flex-col flex-1 p-5 gap-y-5 border"}>
                    <div className={"flex gap-x-5"}>
                        <div className={"flex items-center justify-center w-10 h-10 rounded-full bg-today-dark"}>
                            <div className={"w-5 h-5 rounded-full bg-today"}/>
                        </div>
                        <div className={"w-10 h-10 rounded-full bg-today-dark"}/>
                        <div className={"w-10 h-10 rounded-full bg-today"} />
                        <div className={"w-10 h-10 rounded-full bg-week"}/>
                        <div className={"w-10 h-10 rounded-full bg-month"}/>
                        <div className={"w-10 h-10 rounded-full bg-overdue"}/>
                    </div>
                    <div className="flex flex-col gap-4 p-6 max-w-md font-medium">
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
                        <div className="rounded-lg bg-destructive text-destructive-foreground p-4">
                            <div className={"font-heading text-4xl"}>Destructive</div>
                            <div className={"text-lg"}>Destructive Foreground</div>
                        </div>
                    </div>
                </Card>

                { /* Colours 2 */ }
                <Card className={"flex flex-row flex-1 p-5 gap-y-5 border font-medium"} >
                    <div className="flex flex-col gap-4 p-6 pr-3 w-1/2">
                        <div className="rounded-lg bg-today-dark text-today-dark-foreground p-4">
                            <div className={"font-heading text-4xl"}>Today Dark</div>
                            <div className={"text-lg"}>Today Dark</div>
                        </div>
                        <div className="rounded-lg bg-today text-today-foreground p-4">
                            <div className={"font-heading text-4xl"}>Today</div>
                            <div className={"text-lg"}>Today</div>
                        </div>
                        <div className="rounded-lg bg-week text-week-foreground p-4">
                            <div className={"font-heading text-4xl"}>Week</div>
                            <div className={"text-lg"}>Week</div>
                        </div>
                        <div className="rounded-lg bg-month text-month-foreground p-4">
                            <div className={"font-heading text-4xl"}>Month</div>
                            <div className={"text-lg"}>Month</div>
                        </div>
                        <div className="rounded-lg bg-overdue text-overdue-foreground p-4">
                            <div className={"font-heading text-4xl"}>Overdue</div>
                            <div className={"text-lg"}>Overdue</div>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    )
}
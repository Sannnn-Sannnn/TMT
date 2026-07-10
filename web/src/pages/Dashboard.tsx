import { Card } from "@/components/ui/card.tsx"
import Header from "@/components/ui/Header.tsx";

export default function Dashboard() {
    return (
        <div className="flex flex-col h-screen w-screen">
            <Header />
            <main className={"flex h-full w-full gap-x-5 p-5"}>
                { /* Timer */ }
                <Card className={"flex flex-col w-1/4 p-5 gap-y-5 border"}>
                </Card>

                { /* Today's tasks, overdue tasks */ }
                <Card className={"flex flex-col flex-1 p-5 gap-y-5 border"}>
                    <div className={"flex flex-col p-4 bg-overdue w-1/3 rounded-lg"}>
                        <p className={"text-3xl font-heading font-medium dark:text-background"}>
                            Overdue
                        </p>
                    </div>
                    <div className={"flex flex-col p-4 bg-today w-1/3 rounded-lg"}>
                        <p className={"text-3xl font-heading font-medium dark:text-background"}>
                            Today
                        </p>
                    </div>
                </Card>

                { /* This week's tasks, this month's tasks */ }
                <Card className={"flex flex-col flex-1 p-5 gap-y-5 border"}>
                    <div className={"flex flex-col p-4 bg-week w-1/3 rounded-lg"}>
                        <p className={"text-3xl font-heading font-medium dark:text-background"}>
                            This week
                        </p>
                    </div>
                    <div className={"flex flex-col p-4 bg-month w-1/3 rounded-lg"}>
                        <p className={"text-3xl font-heading font-medium dark:text-background"}>
                            This Month
                        </p>
                    </div>
                </Card>
            </main>
        </div>
    )
}
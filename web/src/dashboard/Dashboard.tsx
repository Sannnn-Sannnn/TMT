import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
    return (
        <div className="flex h-screen w-screen p-5 gap-x-5">
            <Card className={"flex flex-col flex-1 p-5 gap-y-5"}>
                A
                <Button>A</Button>
            </Card>
            <Card className={"flex flex-col flex-1 p-5 gap-y-5"}>
                B
            </Card>
            <Card className={"flex flex-col flex-1 p-5 gap-y-5"}>
                C
            </Card>
        </div>
    )
}
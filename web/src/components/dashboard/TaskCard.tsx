import TaskList from "@/components/dashboard/TaskList.tsx";
import {Card} from "@/components/ui/card.tsx";

interface TaskCardProps {
    cat1: "overdue" | "today" | "week" | "month",
    cat2: "overdue" | "today" | "week" | "month",
    tasks: string[]
}

export default function TaskCard ({ cat1, cat2, tasks }: TaskCardProps) {
    return (
        <Card className={"flex flex-col flex-1 p-5 gap-y-15 border"}>
            <TaskList dueFor={cat1} tasks={tasks}/>
            <TaskList dueFor={cat2} tasks={tasks}/>
        </Card>
    )
}
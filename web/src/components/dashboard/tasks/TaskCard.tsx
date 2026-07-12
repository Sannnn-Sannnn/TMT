import TaskList from "@/components/dashboard/tasks/TaskList.tsx";
import {Card} from "@/components/ui/card.tsx";

interface TaskCardProps {
    cat1: "overdue" | "today" | "week" | "month",
    cat2: "overdue" | "today" | "week" | "month",
}

export default function TaskCard ({ cat1, cat2 }: TaskCardProps) {
    return (
        <Card className={"flex flex-col w-3/8 p-5 gap-y-10 border"}>
            <TaskList dueFor={cat1}/>
            <TaskList dueFor={cat2}/>
        </Card>
    )
}
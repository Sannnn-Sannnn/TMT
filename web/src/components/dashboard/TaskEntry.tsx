import TaskBullet from "@/components/dashboard/TaskBullet.tsx";

interface TaskEntryProps {
    dueFor: "overdue" | "today" | "week" | "month"
    task: string | null
}

export default function TaskEntryProps ({ dueFor, task }: TaskEntryProps) {
    return (
        <div className={"flex items-center gap-x-2"}>
            <TaskBullet dueFor={dueFor} />
            <p className={"text-2xl"}>
                {task}
            </p>
        </div>
    )
}
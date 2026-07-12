import TaskBullet from "@/components/dashboard/TaskBullet.tsx";

interface TaskEntryProps {
    dueFor: "overdue" | "today" | "week" | "month"
    task: string | null
    done: boolean
    onClick: () => void
}

export default function TaskEntryProps ({ dueFor, task, done, onClick }: TaskEntryProps) {
    return (
        <div
            className={"flex items-center gap-x-2 px-2 hover:bg-muted hover:text-muted-foreground"}
            onClick={onClick}
        >
            <TaskBullet dueFor={dueFor}/>
            {done ? (
                <p className={"text-xl line-through"}>
                    {task}
                </p>
            ) : (
                <p className={"text-xl"}>
                    {task}
                </p>
            )}
        </div>
    )
}
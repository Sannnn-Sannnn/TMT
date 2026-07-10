import TaskLabel from "@/components/dashboard/TaskLabel.tsx";
import TaskEntry from "@/components/dashboard/TaskEntry.tsx";

interface TaskListProps {
    dueFor: "overdue" | "today" | "week" | "month"
    tasks: string[]
}

export default function TaskList({ dueFor, tasks }: TaskListProps) {
    return (
        <div className="flex flex-col gap-y-5">
            <TaskLabel dueFor={dueFor} />
            <div className={"flex flex-col gap-y-2"}>
                {tasks.map((task) => (
                    <TaskEntry dueFor={dueFor} task={task} />
                ))}
            </div>
        </div>
    )
}
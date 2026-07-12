import TaskLabel from "@/components/dashboard/TaskLabel.tsx";
import TaskEntry from "@/components/dashboard/TaskEntry.tsx";
import {useState} from "react";

interface TaskListProps {
    dueFor: "overdue" | "today" | "week" | "month"
    tasks: string[]
}

export default function TaskList({ dueFor, tasks }: TaskListProps) {
    const [done, setDone] = useState(false);

    function toggleDone() {
        setDone(!done);
    }

    return (
        <div className="flex flex-col gap-y-2">
            <TaskLabel dueFor={dueFor} />
            <div className={"flex flex-col"}>
                {tasks.map((task) => (
                    <TaskEntry dueFor={dueFor} task={task} done={done} onClick={toggleDone} />
                ))}
            </div>
        </div>
    )
}
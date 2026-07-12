import TaskLabel from "@/components/dashboard/tasks/TaskLabel.tsx";
import {useTasks} from "@/hooks/useTasks.ts";
import type {Task} from "@/types/api.ts";

interface TaskListProps {
    dueFor: "overdue" | "today" | "week" | "month"
}

interface TaskBulletProps {
    dueFor: "overdue" | "today" | "week" | "month"
}

function TaskBullet ({ dueFor }: TaskBulletProps) {
    const colour = {
        overdue: "bg-overdue",
        today: "bg-today",
        week: "bg-week",
        month: "bg-month",
    }
    return <div className={`aspect-square w-2 ${colour[dueFor]} rounded-full`}/>
}

interface TaskEntryProps {
    dueFor: "overdue" | "today" | "week" | "month"
    task: string | null
    done: boolean
    onClick: () => void
}

function TaskEntry ({ dueFor, task, done, onClick }: TaskEntryProps) {
    return (
        <div
            className={"flex items-center gap-x-2 px-2 text-lg hover:bg-muted hover:text-muted-foreground"}
            onClick={onClick}
        >
            <TaskBullet dueFor={dueFor}/>
            {done ? (<p className={"line-through"}>{task}</p>) : (<p>{task}</p>)}
        </div>
    )
}

export default function TaskList({dueFor}: TaskListProps) {
    const { tasks, loading } = useTasks();
    if (loading) return;

    function toggleDone(task: Task) {
        task.done = !task.done;
    }

    return (
        <div className="flex flex-col gap-y-2">
            <TaskLabel dueFor={dueFor} />

            <ul>{tasks.map(t =>
                <li key={t.id}>
                    <TaskEntry dueFor={dueFor} task={t.description} done={t.done} onClick={() => toggleDone(t)} />
                </li>
            )}</ul>
        </div>
    )
}
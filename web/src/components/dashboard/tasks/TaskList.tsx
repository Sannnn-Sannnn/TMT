import TaskLabel from "@/components/dashboard/tasks/TaskLabel";
import {EmptyTaskEntry, TaskEntry} from "@/components/dashboard/tasks/TaskEntry.tsx";
import type {Task} from "@/types/api.ts";

interface TaskListProps {
    period: "overdue" | "today" | "week" | "month"
    tasks: Task[]
    loading: boolean
    onClick: (id: number, done: boolean) => void
    onEdit: (id: number, values: string) => void | Promise<void>;
    onDelete: (id: number) => void | Promise<void>;
}

export default function TaskList({period, tasks, loading, onClick, onEdit, onDelete}: TaskListProps) {
    if (loading) return;

    if (period == "overdue" && tasks.length === 0) {
        return;
    }

    return (
        <div className="flex flex-col gap-y-2">
            <TaskLabel period={period}/>
            <div>
                {tasks.length === 0 && period !== "overdue" ? (
                    <EmptyTaskEntry period={period}/>
                ) : (
                    <ul>{tasks.map(t =>
                        <li key={t.id}>
                            <TaskEntry
                                task={t}
                                onClick={() => {
                                    onClick(t.id, t.done)
                                }}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </li>
                    )}</ul>
                )
                }
            </div>
        </div>
    )
}
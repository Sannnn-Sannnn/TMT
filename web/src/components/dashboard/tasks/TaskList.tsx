import TaskLabel from "@/components/dashboard/tasks/TaskLabel";
import {EmptyTaskEntry, TaskEntry} from "@/components/dashboard/tasks/TaskEntry.tsx";
import type {Task} from "@/types/api.ts";

interface TaskListProps {
    period: "overdue" | "today" | "week" | "month"
    tasks: Task[]
    loading: boolean
    onClick: (id: number, done: boolean) => void
}

export default function TaskList({period, tasks, loading, onClick}: TaskListProps) {
    if (loading) return;

    if (period == "overdue" && tasks.length === 0) {return;}

    return (
        <div className="flex flex-col gap-y-2">
            <TaskLabel period={period}/>
            <div>
                {tasks.length === 0 && period !== "overdue" ? (
                    <EmptyTaskEntry period={period} />
                ) : (
                    <ul>{tasks.map(t =>
                        <li key={t.id}>
                            <TaskEntry
                                period={period}
                                task={t.description}
                                done={t.done}
                                onClick={() => {
                                    onClick(t.id, t.done)
                                }}
                            />
                        </li>
                    )}</ul>
                )
                }
            </div>
        </div>
    )
}
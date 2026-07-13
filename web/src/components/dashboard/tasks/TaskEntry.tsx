interface TaskBulletProps {
    period: "overdue" | "today" | "week" | "month"
}

function TaskBullet ({ period }: TaskBulletProps) {
    const colour = {
        overdue: "bg-overdue",
        today: "bg-today",
        week: "bg-week",
        month: "bg-month",
    }
    return <div className={`aspect-square w-2 ${colour[period]} rounded-full`}/>
}

interface TaskEntryProps {
    period: "overdue" | "today" | "week" | "month"
    task: string | null
    done: boolean
    onClick: () => void
}

export function TaskEntry ({ period, task, done, onClick }: TaskEntryProps) {
    return (
        <div
            className={"flex items-center gap-x-2 px-2 text-lg hover:bg-muted hover:text-muted-foreground"}
            onClick={onClick}
        >
            <TaskBullet period={period}/>
            {done ? (<p className={"line-through"}>{task}</p>) : (<p>{task}</p>)}
        </div>
    )
}

function NewTaskBullet({period}: TaskBulletProps) {
    const colour = {
        overdue: "border-overdue",
        today: "border-today",
        week: "border-week",
        month: "border-month",
    }
    return <div className={`aspect-square w-2 border-2 ${colour[period]} rounded-full`}/>
}

interface NewTaskEntryProps {
    period: "today" | "week" | "month"
}

export function EmptyTaskEntry ({ period }: NewTaskEntryProps) {
    const message = {
        today: "No tasks for today!",
        week: "No tasks for this week!",
        month: "No tasks for this month!",
    }
    return (
        <div
            className={"flex items-center gap-x-2 px-2 text-lg hover:bg-muted hover:text-muted-foreground"}
        >
            <NewTaskBullet period={period}/>
            {message[period]}
        </div>
    )
}
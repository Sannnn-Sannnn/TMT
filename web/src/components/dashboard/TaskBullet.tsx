interface TaskBulletProps {
    dueFor: "overdue" | "today" | "week" | "month"
}

export default function TaskBullet ({ dueFor }: TaskBulletProps) {
    const colour = {
        overdue: "bg-overdue",
        today: "bg-today",
        week: "bg-week",
        month: "bg-month",
    }

    return <div className={`aspect-square w-2 ${colour[dueFor]} rounded-full`}/>
}
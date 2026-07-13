interface TaskLabelProps {
    period: "overdue" | "today" | "week" | "month"
}

export default function TaskLabel({ period }: TaskLabelProps) {
    const text = {
        overdue: "Overdue:",
        today:   "Today's tasks:",
        week:    "This week:",
        month:   "This month:",
    }

    const labelColour = {
        overdue: "bg-overdue text-overdue-foreground",
        today: "bg-today text-today-foreground",
        week: "bg-week text-week-foreground",
        month: "bg-month text-month-foreground",
    }

    return (
        <div className={`w-3/8 p-2 pb-1 ${labelColour[period]} font-heading font-medium text-2xl`}>
            { text[period] }
        </div>
    )
}
import TaskList from "@/components/dashboard/tasks/TaskList.tsx";
import {Card} from "@/components/ui/card.tsx";
import {useTasks} from "@/hooks/useTasks.ts";
import type {Task} from "@/types/api.ts";

function isOverdue(task: Task) {
        return new Date(task.dueFor) >= new Date()
}

export function TaskCard () {
    const {tasks, loading, toggleDone} = useTasks();
    const overdueTasks = tasks.filter(task => isOverdue(task));
    const todayTasks = tasks.filter(task => task.period === "today" && !isOverdue(task));
    const weekTasks = tasks.filter(task => task.period === "week" && !isOverdue(task));
    const monthTasks = tasks.filter(task => task.period === "month" && !isOverdue(task));

    return (
        <div className={"flex flex-row w-3/4 gap-x-5"}>
            { /* Today's tasks, overdue tasks */}
            <Card className={"flex flex-col w-1/2 p-5 gap-y-10 border"}>
                <TaskList period={"overdue"} tasks={overdueTasks} loading={loading} onClick={toggleDone}/>
                <TaskList period={"today"} tasks={todayTasks} loading={loading} onClick={toggleDone}/>
            </Card>

            { /* This week's tasks, this month's tasks */}
            <Card className={"flex flex-col w-1/2 p-5 gap-y-10 border"}>
                <TaskList period={"week"} tasks={weekTasks} loading={loading} onClick={toggleDone}/>
                <TaskList period={"month"} tasks={monthTasks} loading={loading} onClick={toggleDone}/>
            </Card>
        </div>
    )
}
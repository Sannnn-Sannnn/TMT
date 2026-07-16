import TaskList from "@/components/dashboard/tasks/TaskList";
import {Card} from "@/components/ui/card";
import {useTasks} from "@/hooks/useTasks";
import type {Period, Task} from "@/types/api";
import {NewTaskForm} from "@/components/dashboard/tasks/NewTaskForm.tsx";

function isOverdue(task: Task) {
    return new Date(task.dueFor) < new Date()
}

export function TaskCard () {
    const {tasks, loading, toggleDone, createNewTask, updateTaskDescription, removeTask} = useTasks();
    const overdueTasks = tasks.filter(task => isOverdue(task));
    const todayTasks = tasks.filter(task => task.period === "today" && !isOverdue(task));
    const weekTasks = tasks.filter(task => task.period === "week" && !isOverdue(task));
    const monthTasks = tasks.filter(task => task.period === "month" && !isOverdue(task));

    async function handleCreate(name: string, period: Period) {
        await createNewTask({description: name, period: period});
    }

    return (
        <div className={"flex flex-row w-3/4 gap-x-5"}>
            { /* Today's tasks, overdue tasks */}
            <Card className={"flex flex-col w-1/2 p-5 gap-y-10 border"}>

                {overdueTasks.length > 0 && (
                    <div className={"h-1/3"}>
                        <TaskList period={"overdue"} tasks={overdueTasks} loading={loading} onClick={toggleDone}
                                  onEdit={updateTaskDescription} onDelete={removeTask}/>
                    </div>)
                }

                <div className={"h-1/3"}>
                    <TaskList period={"today"} tasks={todayTasks} loading={loading} onClick={toggleDone}
                              onEdit={updateTaskDescription} onDelete={removeTask}/>
                </div>
                <div className={"flex flex-1 items-end w-full"}>
                    <NewTaskForm onCreate={handleCreate}/>
                </div>
            </Card>

            { /* This week's tasks, this month's tasks */}
            <Card className={"flex flex-col w-1/2 p-5 gap-y-10 border"}>
                <div className={"h-1/3"}>
                    <TaskList period={"week"} tasks={weekTasks} loading={loading} onClick={toggleDone}
                              onEdit={updateTaskDescription} onDelete={removeTask}/>
                </div>
                <div className={"h-1/3"}>
                    <TaskList period={"month"} tasks={monthTasks} loading={loading} onClick={toggleDone}
                              onEdit={updateTaskDescription} onDelete={removeTask}/>
                </div>
            </Card>
        </div>
    )
}
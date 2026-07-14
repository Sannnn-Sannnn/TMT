import TaskList from "@/components/dashboard/tasks/TaskList";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useTasks} from "@/hooks/useTasks";
import type {Period, Task} from "@/types/api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {useState} from "react";

function isOverdue(task: Task) {
    /*
    console.log("task:   " + task.description)
    console.log("dueFor: " + new Date(task.dueFor))
    console.log("today:  " + new Date());
     */
    return new Date(task.dueFor) < new Date()
}

const dueForOptions = [
    {label: "Today", value: "today"},
    {label: "This week", value: "week"},
    {label: "This month", value: "month"},
]

type NewTaskFormProps = {
    onCreate: (name: string, period: string) => void | Promise<void>;
}

function NewTaskForm({ onCreate }: NewTaskFormProps) {
    const [open, setOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newPeriod, setNewPeriod] = useState("");

    function resetForm() {
        setNewTaskName("");
        setNewPeriod("");
    }

    function handleOpenChange(nextOpen: boolean) {
        setOpen(nextOpen);
        if (!nextOpen) {
            resetForm();
        }
    }

    async function handleCreate() {
        if (!newTaskName || !newPeriod) return;
        await onCreate(newTaskName, newPeriod);
        setOpen(false);
        resetForm();
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className={"flex flex-1 h-15 p-4 items-center justify-center text-2xl font-medium font-heading text-secondary-foreground bg-secondary hover:bg-secondary/80"}>
                Create new task
            </DialogTrigger>

            <DialogContent className={"bg-card"}>
                <DialogHeader>
                    <DialogTitle className={"text-2xl font-heading font-medium"}>
                        Create new task
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className={"flex flex-col text-lg gap-y-5"}>
                    <div>
                        Description:
                        <Input
                            className={"text-xs"}
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                        />
                    </div>

                    <div className={"flex flex-col w-full"}>
                        Due for:
                        <Select value={newPeriod} onValueChange={setNewPeriod} items={dueForOptions}>
                            <SelectTrigger className={"flex w-full"}>
                                <SelectValue placeholder="Due for" className={"flex flex-1"} />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup className={"bg-card"}>
                                    {dueForOptions.map((item) => (
                                        <SelectItem
                                            className={"text-sm"}
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className={"flex flex-1 p-2 text-lg font-medium font-heading text-secondary-foreground bg-secondary hover:bg-secondary/80"}
                        onClick={handleCreate}
                        disabled={!newTaskName || !newPeriod}
                    >
                        Create
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}


export function TaskCard () {
    const {tasks, loading, toggleDone, createNewTask} = useTasks();
    const overdueTasks = tasks.filter(task => isOverdue(task));
    const todayTasks = tasks.filter(task => task.period === "today" && !isOverdue(task));
    const weekTasks = tasks.filter(task => task.period === "week" && !isOverdue(task));
    const monthTasks = tasks.filter(task => task.period === "month" && !isOverdue(task));

    async function handleCreate(name: string, period: Period) {
        await createNewTask({ description: name, period });
    }

    return (
        <div className={"flex flex-row w-3/4 gap-x-5"}>
            { /* Today's tasks, overdue tasks */}
            <Card className={"flex flex-col w-1/2 p-5 border"}>
                <div className={"flex flex-col w-full gap-y-10"}>
                    <TaskList period={"overdue"} tasks={overdueTasks} loading={loading} onClick={toggleDone}/>
                    <TaskList period={"today"} tasks={todayTasks} loading={loading} onClick={toggleDone}/>
                </div>
                <div className={"flex flex-1 items-end w-full"}>
                    <NewTaskForm onCreate={handleCreate} />
                </div>
            </Card>

            { /* This week's tasks, this month's tasks */}
            <Card className={"flex flex-col w-1/2 p-5 gap-y-10 border"}>
                <TaskList period={"week"} tasks={weekTasks} loading={loading} onClick={toggleDone}/>
                <TaskList period={"month"} tasks={monthTasks} loading={loading} onClick={toggleDone}/>
            </Card>
        </div>
    )
}
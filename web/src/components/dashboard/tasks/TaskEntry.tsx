import {EllipsisVertical, Pencil, Trash2} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type {Task} from "@/types/api.ts";
import {useState} from "react";
import {TaskEditDialog} from "@/components/dashboard/tasks/TaskEditDialog.tsx";
import {DeleteTaskDialog} from "@/components/dashboard/tasks/DeleteDialog.tsx";

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

interface DropdownMenuIconsProps {
    onEdit: () => void;
    onDelete: () => void;
}

export function DropdownMenuIcons({ onEdit, onDelete }: DropdownMenuIconsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={<EllipsisVertical/>}
            />
            <DropdownMenuContent className={"bg-card shadow-none border ring-0"}>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.preventDefault();
                        onEdit();
                    }}
                >
                    <Pencil/>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    variant="destructive"
                    onClick={(e) => {
                        e.preventDefault();
                        onDelete();
                    }}
                >
                    <Trash2/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function isOverdue(task: Task) {
    return new Date(task.dueFor) < new Date()
}

interface TaskEntryProps {
    task: Task;
    onClick: () => void;
    onEdit: (id: number, values: string) => void | Promise<void>;
    onDelete: (id: number) => void | Promise<void>;
}

export function TaskEntry ({task, onClick, onEdit, onDelete }: TaskEntryProps) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const period = isOverdue(task) ? "overdue" : task.period;

    return (
        <div
            className={"flex items-center gap-x-2 px-2 text-lg hover:bg-muted hover:text-muted-foreground"}
        >
            <TaskBullet period={period}/>
            <div className={`flex flex-1 ${task.done ? "line-through" : ""}`} onClick={onClick}>
                {task.description}
            </div>
                <DropdownMenuIcons onEdit={() => {
                    setEditOpen(true)
                }} onDelete={() => {
                    setDeleteOpen(true)
                }}/>

            <TaskEditDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                initialValues={task.description}
                onSubmit={(values) => onEdit(task.id, values)}
            />

            <DeleteTaskDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                taskDescription={task.description}
                onConfirm={() => onDelete(task.id)}
            />

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
            className={"flex items-center gap-x-2 px-2 text-lg"}
        >
            <NewTaskBullet period={period}/>
            {message[period]}
        </div>
    )
}
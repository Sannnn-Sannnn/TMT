import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
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
import type {Period} from "@/types/api.ts";

interface NewTaskFormProps {
    onCreate: (name: string, period: Period) => Promise<void>;
}

export function NewTaskForm({ onCreate }: NewTaskFormProps) {
    const [open, setOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newPeriod, setNewPeriod] = useState<Period>("today");

    const dueForOptions = [
        {label: "Today", value: "today"},
        {label: "This week", value: "week"},
        {label: "This month", value: "month"},
    ]

    function resetForm() {
        setNewTaskName("");
        setNewPeriod("today");
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
                        <Select value={newPeriod} onValueChange={(value) => {
                            if (value) setNewPeriod(value);
                        }} items={dueForOptions}>
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
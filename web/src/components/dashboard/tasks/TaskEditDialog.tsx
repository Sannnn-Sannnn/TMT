import {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


type TaskFormDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues?: string;
    onSubmit: (description: string) => void | Promise<void>;
};

export function TaskEditDialog({ open, onOpenChange, initialValues, onSubmit }: TaskFormDialogProps) {
    const [description, setDescription] = useState(initialValues ?? "");

    useEffect(() => {
        if (open) {
            setDescription(initialValues ?? "");
        }
    }, [open, initialValues]);

    function handleOpenChange(nextOpen: boolean) {
        onOpenChange(nextOpen);
    }

    async function handleSubmit() {
        if (!description) return;
        await onSubmit(description);
        handleOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className={"bg-card"}>
                <DialogHeader>
                    <DialogTitle className={"text-2xl font-heading font-medium"}>
                        Edit task
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className={"flex flex-col text-lg gap-y-5"}>
                    <div>
                        Description:
                        <Input
                            className={"text-xs"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <Button
                        className={"flex flex-1 p-2 text-lg font-medium font-heading text-secondary-foreground bg-secondary hover:bg-secondary/80"}
                        onClick={handleSubmit}
                        disabled={!description}
                    >
                        Save
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
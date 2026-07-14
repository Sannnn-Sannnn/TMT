import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

type DeleteTaskDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    taskDescription: string;
    onConfirm: () => void | Promise<void>;
};

export function DeleteTaskDialog({ open, onOpenChange, taskDescription, onConfirm}: DeleteTaskDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={"bg-card"}>
                <DialogHeader>
                    <DialogTitle className={"text-2xl font-heading font-medium"}>
                        Delete task
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className={"flex flex-col text-lg gap-y-5"}>
                    <div>
                        This will permanently delete “{taskDescription}”.
                        This can’t be undone.
                    </div>
                    <Button
                        className={"flex flex-1 p-2 text-lg font-medium font-heading text-destructive-foreground bg-destructive hover:bg-destructive/80"}
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
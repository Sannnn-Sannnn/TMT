import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

type LogoutDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void | Promise<void>;
};

export function LogoutDialog({ open, onOpenChange, onConfirm}: LogoutDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={"bg-card"}>
                <DialogHeader>
                    <DialogTitle className={"text-2xl font-heading font-medium"}>
                        Log out
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className={"flex flex-col text-lg gap-y-5"}>
                    Do you want to log out?
                    <Button
                        className={"flex flex-1 p-2 text-lg font-medium font-heading text-destructive-foreground bg-destructive hover:bg-destructive/80"}
                        onClick={onConfirm}
                    >
                        Log out
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
import {Button} from "@/components/ui/button.tsx";
import {MoonStar, Sun} from "lucide-react";
import {useTheme} from "@/hooks/useTheme.ts";
import {useNavigate} from "react-router-dom";

export default function Landing() {
    const {isDark, toggle} = useTheme();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen w-screen">

            <div className="flex items-center justify-between px-10 h-1/14 w-screen bg-primary text-primary-foreground">
                <div className={"font-heading font-medium text-4xl"}>
                    TMT - Time Makes Tasks
                </div>
                <div
                    onClick={toggle}
                >
                    {isDark ? (
                        <MoonStar className={"h-8 w-8"}/>
                    ) : (
                        <Sun className={"h-8 w-8"}/>
                    )}
                </div>
            </div>

            <main className={"flex flex-col w-full gap-y-5 px-5 py-10"}>
                <div className={"absolute inset-0 -z-10 pointer-events-none overflow-hidden"}>
                    <div className={"absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 flex items-center justify-center p-5 h-[150vh] rounded-full aspect-square border-primary border-150"}>
                        <div className={"flex flex-1 items-center justify-center p-5 rounded-full aspect-square border-secondary border-150"}>
                            <div className={"flex flex-1 rounded-full aspect-square border-month border-150"} />
                        </div>
                    </div>
                </div>

                <div className={"flex justify-start pl-75   "}>
                    <div className="relative bg-primary text-primary-foreground font-heading font-medium text-7xl p-5">
                        What is TMT?
                    </div>
                </div>

                <div className={"relative flex justify-end mt-15"}>
                    <div className="flex flex-col bg-secondary text-secondary-foreground text-3xl p-5">
                        <p>TMT is a simple productivity tool that helps you organize your daily work with a built-in</p>
                        <p>to-do list and a customizable Pomodoro timer.</p>
                    </div>
                </div>

                <div className={"relative flex justify-end mt-5"}>
                    <div className="flex flex-col bg-month text-month-foreground text-3xl p-5">
                        <p>Plan ahead your tasks for today, this week and this month, all in one place.</p>
                    </div>
                </div>

                <div className={"relative flex justify-center mt-25"}>
                    <Button
                        className={"h-15 flex px-25 py-8 text-2xl font-medium font-heading"}
                        onClick={() => navigate("/login")}
                    >
                        Register now!
                    </Button>
                </div>
            </main>
        </div>
    )
}
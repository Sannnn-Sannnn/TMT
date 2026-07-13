import Header from "@/components/ui/Header.tsx";
import {TaskCard} from "@/components/dashboard/tasks/TaskCard.tsx";
import TimerCard from "@/components/dashboard/timer/TimerCard.tsx";

export default function Dashboard() {
    return (
        <div className="flex flex-col h-screen w-screen">
            <Header/>
            <main className={"flex h-full w-full gap-x-5 p-5"}>
                { /* Timer */}
                <TimerCard/>
                { /* Tasks */}
                <TaskCard/>
            </main>
        </div>
    )
}
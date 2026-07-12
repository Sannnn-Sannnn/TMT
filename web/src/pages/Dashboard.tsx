import Header from "@/components/ui/Header.tsx";
import TaskCard from "@/components/dashboard/tasks/TaskCard.tsx";
import TimerCard from "@/components/dashboard/timer/TimerCard.tsx";

const mockTasks = [
            "Revisar documentación de autenticación",
            "Preparar presentación del avance",
            "Corregir errores en formulario de registro",
            "Organizar tareas del sprint",
            "Investigar alternativas para mejorar rendimiento de carga inicial"
]

export default function Dashboard() {
    return (
        <div className="flex flex-col h-screen w-screen">
            <Header/>
            <main className={"flex h-full w-full gap-x-5 p-5"}>
                { /* Timer */}
                <TimerCard />

                { /* Today's tasks, overdue tasks */}
                <TaskCard cat1={"overdue"} cat2={"today"}/>

                { /* This week's tasks, this month's tasks */}
                <TaskCard cat1={"week"} cat2={"month"}/>
            </main>
        </div>
    )
}
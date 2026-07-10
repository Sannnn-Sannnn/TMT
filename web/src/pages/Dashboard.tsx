import Header from "@/components/ui/Header.tsx";
import TaskCard from "@/components/dashboard/TaskCard.tsx";
import Timer from "@/components/dashboard/Timer.tsx";

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
                <Timer />

                { /* Today's tasks, overdue tasks */}
                <TaskCard cat1={"overdue"} cat2={"today"} tasks={mockTasks}/>

                { /* This week's tasks, this month's tasks */}
                <TaskCard cat1={"week"} cat2={"month"} tasks={mockTasks}/>
            </main>
        </div>
    )
}
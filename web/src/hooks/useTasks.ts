import { useState, useEffect } from "react";
import {getTasks, updateTask, createTask, deleteTask} from "../api/tasks";
import type {Period, Task} from "../types/api";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTasks()
            .then(setTasks)
            .finally(() => setLoading(false));
    }, []);

    async function toggleDone(taskId: number, currentDone: boolean) {
        const updatedTask = await updateTask(taskId, { done: !currentDone });
        setTasks(prev =>
            prev.map(t => (t.id === taskId ? updatedTask : t))
        );
    }

    async function createNewTask(
        task: { description: string; period: Period}
    ) {
        const newTask = await createTask(task);
        setTasks(prev => [...prev, newTask]);
    }

    async function updateTaskDescription(taskId: number, description: string) {
        const updatedTask = await updateTask(taskId, { description });
        setTasks(prev =>
            prev.map(t => (t.id === taskId ? updatedTask : t))
        );
    }

    async function removeTask(taskId: number) {
        await deleteTask(taskId);
        setTasks(prev =>
            prev.filter(task => task.id !== taskId)
        );
    }

    return { tasks, loading, toggleDone, createNewTask, updateTaskDescription, removeTask };
}
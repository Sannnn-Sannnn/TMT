import { useState, useEffect } from "react";
import { getTasks } from "../api/tasks";
import type { Task } from "../types/api";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTasks()
            .then(setTasks)
            .finally(() => setLoading(false));
    }, []);

    return { tasks, loading };
}
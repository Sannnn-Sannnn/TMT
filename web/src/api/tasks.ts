import { apiFetch } from "./client";
import type {Task} from "../types/api";

export function getTasks(): Promise<Task[]> {
    return apiFetch("/tasks");
}

export function createTask(data: { description: string; dueFor: string }): Promise<Task> {
    return apiFetch("/tasks", { method: "POST", body: JSON.stringify(data) });
}
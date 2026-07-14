import { apiFetch } from "./client";
import type {Task, Period} from "../types/api";

export function getTasks(): Promise<Task[]> {
    return apiFetch("/tasks");
}

export function createTask(data: { description: string; period: Period}): Promise<Task> {
    return apiFetch("/tasks", { method: "POST", body: JSON.stringify(data) });
}

export function updateTask(taskId: number, data: { description?: string; done?: boolean }): Promise<Task> {
    return apiFetch(`/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify(data) });
}

export function deleteTask(taskId: number): Promise<Task> {
    return apiFetch(`/tasks/${taskId}`, { method: "DELETE" });
}
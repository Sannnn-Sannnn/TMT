import type {LoginResponse, User} from "@/types/api.ts";
import {apiFetch} from "@/api/client.ts";

export function login(email: string, password: string): Promise<LoginResponse> {
    return apiFetch(`/users/login`, {method: "POST", body: JSON.stringify({email, password})});
}

export function register(email: string, password: string):Promise<LoginResponse> {
    return apiFetch(`/users/register`, {method: "POST", body: JSON.stringify({email, password})});
}

export function logout(): Promise<void> {
    return apiFetch("/users/logout", {method: "POST"})
}

export async function getCurrentUser(): Promise<User | null> {
    return await apiFetch("/users/current", {method: "GET"});
}
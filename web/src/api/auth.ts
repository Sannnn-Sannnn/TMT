import type {LoginResponse} from "@/types/api.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Invalid credentials");
    }

    return res.json();
}
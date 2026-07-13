export interface User {
    id: number
    email: string
    name: string
}

export type Period = "today" | "week" | "month";

export interface Task {
    id: number
    description: string
    createdAt: string
    dueFor: string
    period: Period,
    done: boolean,
}

export interface LoginResponse {
    user: User
    token: string
}
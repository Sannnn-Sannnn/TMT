export interface User {
    id: number
    email: string
    name: string
}

export interface Task {
    id: number
    description: string
    createdAt: string
    dueFor: string
    done: boolean,
}

export interface LoginResponse {
    user: User
    token: string
}
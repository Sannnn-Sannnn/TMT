const TOKEN_KEY = "token";

export function getToken(): string | null {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzgzODY2MDM2LCJleHAiOjE3ODY0NTgwMzZ9.Gy78u1HxAn3oVkY16Dykq4nUJfR-GAkIhQn7JY2DXVc"
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function deleteToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}
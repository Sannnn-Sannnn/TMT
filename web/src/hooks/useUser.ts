import {useEffect, useState} from "react";
import type {User} from "@/types/api.ts";
import {getCurrentUser, login, logout, register} from "@/api/auth.ts";
import {deleteToken, getToken, setToken} from "@/api/authStorage.ts";

export function useUser() {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadUser() {
            const token = getToken()
            if (token === null) {
                setLoading(false)
                return
            }

            try {
                const currentUser = await getCurrentUser();
                if (!cancelled) setUser(currentUser ?? undefined);
            } catch {
                if (!cancelled) {
                    deleteToken()
                    setUser(undefined)
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        loadUser();
        return () => {
            cancelled = true;
        }
    }, []);

    async function userLogin(mail: string, password: string) {
        setError(null);
        setLoading(true);
        try {
            const {user, token} = await login(mail, password);
            setToken(token)
            setUser(user)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed.");
            setUser(undefined)
            throw err;
        } finally {
            setLoading(false)
        }
    }

    async function userRegister(mail: string, password: string) {
        setError(null)
        setLoading(true)
        try {
            const {user, token} = await register(mail, password);
            setToken(token)
            setUser(user)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed.");
            setUser(undefined)
            throw err;
        } finally {
            setLoading(false)
        }

    }

    async function userLogout() {
        setError(null);
        setLoading(true)
        try {
            await logout();
            deleteToken()
            setUser(undefined)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed.");
            throw err;
        } finally {
            setLoading(false)
        }
    }

    return {user, loading, error, userLogin, userRegister, userLogout}
}
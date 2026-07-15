import { useEffect, useState } from "react"

const THEME_KEY = "theme"
const DEFAULT_THEME = "light"

function getSavedTheme() {
    if (typeof window === "undefined") return false
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (!savedTheme) localStorage.setItem(THEME_KEY, DEFAULT_THEME)
    return (savedTheme ?? DEFAULT_THEME) === "dark"
}

export function useTheme() {
    const [isDark, setIsDark] = useState(getSavedTheme())

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark)
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light")
    }, [isDark])

    const toggle = () => {
        setIsDark((prev) => !prev)
    }

    /* New - unfinished */
    return { isDark, toggle }

    /* Old - functioning */
    // return { isDark, toggle: () => setIsDark((prev) => !prev) }
}
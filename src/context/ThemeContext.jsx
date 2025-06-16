import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.className = `${theme}-theme`
    }, [theme])

    const handleTheme = () => {
        if (theme === "dark") {
            localStorage.setItem("theme", "light")
            setTheme("light");
        } else {
            setTheme("dark");
            localStorage.setItem("theme", "dark")
        }
    }

    return (
        <ThemeContext.Provider value={{theme, handleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
import React, { useEffect, useState } from 'react'
import { CiLight, CiDark } from "react-icons/ci";

import styles from './ControlTheme.module.css'

const ControlTheme = () => {

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
        <div className={styles.container_theme}>
            <div className={`${styles.container_theme_item} ${theme === "light" && styles.active}`} onClick={handleTheme}><CiLight size={17} /></div>
            <div className={`${styles.container_theme_item} ${theme === "dark" && styles.active}`} onClick={handleTheme}><CiDark size={17} /></div>
        </div>
    )
}

export default ControlTheme
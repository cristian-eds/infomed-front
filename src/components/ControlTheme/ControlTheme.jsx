import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import styles from './ControlTheme.module.css'

import { CiLight, CiDark } from "react-icons/ci";

const ControlTheme = () => {

    const {theme, handleTheme} = useContext(ThemeContext);

    return (
        <div className={styles.container_theme}>
            <div className={`${styles.container_theme_item} ${theme === "light" && styles.active}`} onClick={handleTheme}><CiLight size={17} /></div>
            <div className={`${styles.container_theme_item} ${theme === "dark" && styles.active}`} onClick={handleTheme}><CiDark size={17} /></div>
        </div>
    )
}

export default ControlTheme
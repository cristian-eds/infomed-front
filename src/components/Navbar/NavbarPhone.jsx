import React from 'react'

import { FiMenu } from "react-icons/fi";

import styles from './NavbarPhone.module.css'

const NavbarPhone = () => {
    return (
        <nav className={styles.navbar}>
            <button><FiMenu /></button>
            <span>InfoMed</span>
        </nav>
    )
}

export default NavbarPhone
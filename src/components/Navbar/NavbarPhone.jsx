import React, { useState } from 'react'

import { FiMenu } from "react-icons/fi";

import styles from './NavbarPhone.module.css'
import SideMenu from '../SideMenu/SideMenu';

const NavbarPhone = () => {

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }
    return (
        <nav className={styles.navbar} id={styles.navbar_phone}>
            <button onClick={handleShowMenu}><FiMenu size={20}/></button>
            <span>InfoMed</span>
            {showMenu && <SideMenu closeMenu={() => setShowMenu(false)}/> }
        </nav>
    )
}

export default NavbarPhone
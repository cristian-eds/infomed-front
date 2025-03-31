import React from 'react'

import styles from './Navbar.module.css'
import { NavLink } from 'react-router'

const Navbar = ({logout}) => {

  return (
    <nav className={styles.navbar}>
      <span>InfoMed</span>
      <div className={styles.navbar__itens}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/medicines">Medicamentos</NavLink>
        <NavLink>Perfil</NavLink>
      </div>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar
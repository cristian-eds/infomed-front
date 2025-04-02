import React from 'react'

import styles from './Navbar.module.css'
import { NavLink } from 'react-router'

const Navbar = ({logout}) => {

  return (
    <nav className={styles.navbar}>
      <span>InfoMed</span>
      <div className={styles.navbar__itens}>
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/medicines" activeClassName="active">Medicamentos</NavLink>
        <NavLink to="/perfil" activeClassName="active">Perfil</NavLink>
      </div>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar
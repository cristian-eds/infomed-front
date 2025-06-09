import React, { useEffect, useState } from 'react'

import styles from './Navbar.module.css'
import { NavLink } from 'react-router'

const Navbar = ({logout, role}) => {

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = `${theme}-theme`
  },[theme])

  const handleTheme = () => {
    if(theme === "dark") {
      setTheme("light");
    } else{
      setTheme("dark");
    }

  }

  return (
    <nav className={styles.navbar} id={styles.navbar}>
      <span>InfoMed</span>
      <div className={styles.navbar__itens}>
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/medicines" activeClassName="active">Medicamentos</NavLink>
         {role === "ADMIN" && <NavLink to="/person" activeClassName="active">Pessoas</NavLink> }
        <NavLink to="/profile" activeClassName="active">Perfil</NavLink>
      </div>
      <div >
        <button onClick={logout}>Logout</button>
        <button onClick={handleTheme}>Tema</button>
      </div>
    </nav>
  )
}

export default Navbar
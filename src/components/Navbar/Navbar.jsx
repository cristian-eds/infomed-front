import styles from './Navbar.module.css'
import { NavLink } from 'react-router'
import ControlTheme from '../ControlTheme/ControlTheme';

const Navbar = ({logout, role}) => {

  return (
    <nav className={styles.navbar} id={styles.navbar}>
      <span>InfoMed</span>
      <div className={styles.navbar__itens}>
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/medicines" activeClassName="active">Medicamentos</NavLink>
         {role === "ADMIN" && <NavLink to="/person" activeClassName="active">Pessoas</NavLink> }
        <NavLink to="/profile" activeClassName="active">Perfil</NavLink>
      </div>
      <div className={styles.navbar__itens}>
        <button onClick={logout}>Logout</button>
        <ControlTheme />
      </div>
    </nav>
  )
}

export default Navbar
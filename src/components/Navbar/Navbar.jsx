import styles from './Navbar.module.css'

import { NavLink } from 'react-router'

import { useTranslation } from 'react-i18next';

import ControlTheme from '../ControlTheme/ControlTheme';
import ConfigPopHover from '../ConfigPopHover/ConfigPopHover';

const Navbar = ({ logout, role }) => {

  const { t } = useTranslation();

  return (
    <nav className={styles.navbar} id={styles.navbar}>
      <span>InfoMed</span>
      <div className={styles.navbar__itens}>
        <NavLink to="/" activeClassName="active">{t('navbar.text-home')}</NavLink>
        <NavLink to="/medicines" activeClassName="active">{t('navbar.text-medicine')}</NavLink>
        {role === "ADMIN" && <NavLink to="/person" activeClassName="active">{t('navbar.text-person')}</NavLink>}
        {role !== "GUEST" && <NavLink to="/profile" activeClassName="active">{t('navbar.text-profile')}</NavLink>}
      </div>
      <div className={styles.navbar__itens}>
        <button onClick={logout}>{t('navbar.text-logout')}</button>
        <ConfigPopHover />
      </div>
    </nav>
  )
}

export default Navbar
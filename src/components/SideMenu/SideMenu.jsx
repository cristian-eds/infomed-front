import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';

import styles from './SideMenu.module.css'

import { FaHome } from "react-icons/fa";
import { RiMedicineBottleLine } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { RiLogoutBoxLine } from "react-icons/ri";

import { AuthContext } from '../../context/AuthContext';

import ControlTheme from '../ControlTheme/ControlTheme';
import ControlLanguage from '../ControlLanguage/ControlLanguage';


const SideMenu = ({ closeMenu, role }) => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const {logout} = useContext(AuthContext);

    const navigateToLink = (link) => {
        navigate(link);
        closeMenu();
    }

    return (
        <div className={styles.container_menu}>
            <ul>
                <li onClick={() => navigateToLink("/")}><FaHome /> {t('navbar.text-home')}</li>
                <li onClick={() => navigateToLink("/medicines")}><RiMedicineBottleLine />{t('navbar.text-medicine')}</li>
                {role === "ADMIN" && <li onClick={() => navigateToLink("/person")}><IoMdPeople />{t('navbar.text-person')}</li>}
                <li onClick={() => navigateToLink("/profile")}><ImProfile />{t('navbar.text-profile')}</li>
            </ul>
            <div>
                <ul>
                    <li> <ControlLanguage /> <p>{t('navbar.text-languages')}</p> </li>
                    <li> <ControlTheme /> <p>{t('navbar.text-themes')}</p> </li>
                    <li onClick={logout}><RiLogoutBoxLine /> {t('navbar.text-logout')}</li>
                </ul>
            </div>
        </div>
    )
}

export default SideMenu
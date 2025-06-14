import { useNavigate } from 'react-router';

import styles from './SideMenu.module.css'

import { FaHome } from "react-icons/fa";
import { RiMedicineBottleLine } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { RiLogoutBoxLine } from "react-icons/ri";

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import ControlTheme from '../ControlTheme/ControlTheme';

const SideMenu = ({ closeMenu, role }) => {

    const navigate = useNavigate();

    const {logout} = useContext(AuthContext);

    const navigateToLink = (link) => {
        navigate(link);
        closeMenu();
    }

    return (
        <div className={styles.container_menu}>
            <ul>
                <li onClick={() => navigateToLink("/")}><FaHome /> Home</li>
                <li onClick={() => navigateToLink("/medicines")}><RiMedicineBottleLine /> Medicine</li>
                {role === "ADMIN" && <li onClick={() => navigateToLink("/person")}><IoMdPeople /> Person</li>}
                <li onClick={() => navigateToLink("/profile")}><ImProfile /> Profile</li>
            </ul>
            <div>
                <ul>
                    <li> <ControlTheme /> <p>Theme</p> </li>
                    <li onClick={logout}><RiLogoutBoxLine /> Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default SideMenu
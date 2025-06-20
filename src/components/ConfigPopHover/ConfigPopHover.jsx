import { FaGear } from "react-icons/fa6";

import ControlTheme from '../ControlTheme/ControlTheme'
import ControlLanguage from "../ControlLanguage/ControlLanguage";

import styles from './ConfigPopHover.module.css';
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ConfigPopHover = () => {

    const [showPopHover, setShowPopHover] = useState(false);
    const {t} = useTranslation();

    const handleShow = () => {
        setShowPopHover(!showPopHover);
    }

    return (
        <div className={`${styles.pophover} ${showPopHover && styles.pophover_active}`}>
            <FaGear size={18} onClick={handleShow}/>
            {showPopHover &&
                <div className={styles.pophover_content}>
                    <div className={styles.pophover_content_itens}>
                        <p>{t('config-pop-hover.text-themes')}</p>
                        <ControlTheme handleShowPopHover={handleShow}/>
                    </div>
                    <hr />
                    <div className={styles.pophover_content_itens}>
                        <p>{t('config-pop-hover.text-languages')}</p>
                        <ControlLanguage handleShowPopHover={handleShow}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default ConfigPopHover
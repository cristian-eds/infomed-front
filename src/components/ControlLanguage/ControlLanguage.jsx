import React from 'react'
import { useTranslation } from 'react-i18next';

import styles from './ControlLanguage.module.css';

const languages = [
    {
        "language": "Portuguese",
        "sigla": "pt-BR"
    },
    {
        "language": "English",
        "sigla": "en"
    }
]

const ControlLanguage = ({handleShowPopHover}) => {

    const { i18n } = useTranslation();

    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
        localStorage.setItem("lang",event.target.value);
        handleShowPopHover();
    };

    return (
        <div className={styles.control_language}>
            <select name="language" id="language" onChange={handleLanguageChange} value={i18n.language}>
                {
                    languages.map((language, index) => (
                        <option key={index} value={language.sigla}>{language.language}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default ControlLanguage
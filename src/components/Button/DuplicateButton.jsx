import React from 'react'

import { GrDuplicate } from "react-icons/gr";

import styles from './Button.module.css';

const DuplicateButton = ({actionClick}) => {
    return (
        <button title='Duplicar medicamento' onClick={actionClick} className={`${styles.button} ${styles.button_duplicate}`}>
            <GrDuplicate size={15} />
        </button>
    )
}

export default DuplicateButton
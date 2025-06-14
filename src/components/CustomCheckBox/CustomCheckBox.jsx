import React from 'react'

import styles from './CustomCheckBox.module.css'

import { FaCheck } from "react-icons/fa";

const CustomCheckBox = ({ checked, handleCheck, centralized = true }) => {

    return (
        <div className={`${styles.container_checkbox} ${centralized && styles.centralized} `} onClick={handleCheck}> 
            {checked  &&  <FaCheck /> }
        </div>
    )
}

export default CustomCheckBox
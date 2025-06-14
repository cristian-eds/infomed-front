import React from 'react'

import styles from './CustomCheckBox.module.css'

import { FaCheck } from "react-icons/fa";

const CustomCheckBox = ({ checked, setChecked }) => {

    return (
        <div className={styles.container_checkbox}> 
            {checked  &&  <FaCheck /> }
        </div>
    )
}

export default CustomCheckBox
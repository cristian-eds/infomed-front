import React from 'react'

import { FaArrowLeft } from "react-icons/fa";

import styles from './Button.module.css';


const ArrowLeftButton = ({actionClick}) => {
  return (
    <button onClick={actionClick} className={styles.button}>
        <FaArrowLeft />
    </button>
  )
}

export default ArrowLeftButton
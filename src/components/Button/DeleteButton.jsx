import React from 'react'

import { MdDeleteOutline } from "react-icons/md";

import styles from './Button.module.css';


const DeleteButton = ({actionClick}) => {
  return (
    <button onClick={actionClick} className={`${styles.button} ${styles.button_cancel}`}>
        <MdDeleteOutline size={15}/> 
    </button>
  )
}

export default DeleteButton
import React from 'react'

import styles from './Button.module.css';

import { FaPlus } from 'react-icons/fa'

const ButtonPlus = ({action}) => {
  return (
    <button onClick={action} className={styles.button_plus}><FaPlus /></button>
  )
}

export default ButtonPlus
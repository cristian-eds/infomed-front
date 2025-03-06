import React from 'react'

import styles from './Button.module.css'

const Button = ({type, value, variant, onClick}) => {
  return (
    <input type={type} value={value} className={`${styles.button_input} ${styles[variant]}`} onClick={onClick && onClick}/>
  )
}

export default Button
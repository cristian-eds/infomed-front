import React from 'react'

import styles from './Button.module.css';


const PaginationButton = ({actionClick, disabled = false ,children}) => {
  return (
    <button onClick={actionClick} className={`${styles.button} ${styles.button_pagination}`} disabled={disabled}>
        {children}
    </button>
  )
}

export default PaginationButton
import React from 'react'

import styles from './Button.module.css'

const ButtonGroup = ({children}) => {
  return (
    <div className={styles.button_group}>
        {children}
    </div>
  )
}

export default ButtonGroup
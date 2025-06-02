import React from 'react'
import styles from './MessageError.module.css'

const MessageError = ({ message }) => {
  return (<>
    {message && <p className={styles.error}>{message}</p>}
  </>
  )
}

export default MessageError
import styles from './Modal.module.css'

const ModalHeader = ({children}) => {
  return (
    <header className={styles.modal_content_header}>
      <>
        {children}
      </>
    </header>
  )
}

export default ModalHeader
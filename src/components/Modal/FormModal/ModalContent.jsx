import styles from '../Modal.module.css'

const ModalContent = ({children}) => {
  return (
    <div className={styles.modal_content}>
        <>
            {children}
        </>
    </div>
  )
}

export default ModalContent
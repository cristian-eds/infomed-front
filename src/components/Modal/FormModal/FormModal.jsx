import styles from '../Modal.module.css'

const FormModal = ({ action, children }) => {
  return (
    <form className={styles.medication_form} onSubmit={action}>
      <>
        {children}
      </>
    </form>
  )
}

export default FormModal
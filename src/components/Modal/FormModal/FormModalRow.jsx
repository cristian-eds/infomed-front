import styles from '../Modal.module.css'

const FormModalRow = ({ children }) => {
  return (
    <div className={styles.form_row}>
      <>
        {children}
      </>
    </div>
  )
}

export default FormModalRow
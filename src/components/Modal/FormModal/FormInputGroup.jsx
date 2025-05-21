import styles from '../Modal.module.css'

const FormInputGroup = ({children}) => {
  return (
    <div className={styles.input_group}>
        <>
            {children}
        </>
    </div>
  )
}

export default FormInputGroup
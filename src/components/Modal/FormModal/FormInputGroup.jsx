import styles from '../Modal.module.css'

const FormInputGroup = ({disabled, children}) => {
  return (
    <div className={`${styles.input_group} ${disabled && styles.disabled}`}>
        <>
            {children}
        </>
    </div>
  )
}

export default FormInputGroup
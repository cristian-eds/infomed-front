import styles from './Button.module.css'

const Button = ({type, value, variant, onClick, disabled}) => {
  return (
    <input type={type} value={value} className={`${styles.button_input} ${styles[variant]}`} onClick={onClick && onClick} disabled={disabled}/>
  )
}

export default Button
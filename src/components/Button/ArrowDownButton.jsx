import { IoIosArrowDown } from 'react-icons/io';

import styles from './Button.module.css';

const ArrowDownButton = ({actionClick}) => {
  return (
    <button onClick={actionClick} className={`${styles.button} ${styles.button_back}`}>
        <IoIosArrowDown />
    </button>
  )
}

export default ArrowDownButton
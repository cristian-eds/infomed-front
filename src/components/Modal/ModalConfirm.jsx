import Modal from './Modal'

import styles from './Modal.module.css'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'

const ModalConfirm = ({ object, text, handleConfirm, handleHiddenModal}) => {

  return (
    <Modal>
      <div className={styles.modal_content_minor}>
        <header className={styles.modal_content_header}>
          <ArrowLeftButton actionClick={handleHiddenModal} />
          <h1>{object.name}</h1>
        </header>
        <div className={`${styles.modal_content_header_text} ${styles.modal_content_text}`}>
          <h2>{text}</h2>
          <ButtonGroup>
            <Button value="Confirmar" type="submit" variant="button_confirm" onClick={() => handleConfirm()}/>
            <Button value="Cancelar" type="button" onClick={handleHiddenModal} variant="button_cancel" />
          </ButtonGroup>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirm
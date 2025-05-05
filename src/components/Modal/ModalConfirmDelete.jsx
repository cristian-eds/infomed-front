import React from 'react'
import Modal from './Modal'

import styles from './Modal.module.css'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'

const ModalConfirmDelete = ({ object, text, handleDelete, handleHiddenModalDelete }) => {

  return (
    <Modal>
      <div className={styles.modal_content_minor}>
        <header className={styles.modal_content_header}>
          <ArrowLeftButton actionClick={handleHiddenModalDelete} />
          <h1>{object.name}</h1>
        </header>
        <div className={styles.modal_content_header_text} style={{padding: '2em'}}>
          <h2>{text}</h2>
          <ButtonGroup>
            <Button value="Confirmar" type="submit" variant="button_confirm" onClick={() => handleDelete()}/>
            <Button value="Cancelar" type="button" onClick={handleHiddenModalDelete} variant="button_cancel" />
          </ButtonGroup>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirmDelete
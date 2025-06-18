import React from 'react'
import Modal from './Modal'

import styles from './Modal.module.css'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'

const ModalConfirmDelete = ({ object, text, handleDelete, handleHiddenModalDelete }) => {

  const {t} = useTranslation();

  return (
    <Modal>
      <div className={styles.modal_content_minor}>
        <header className={styles.modal_content_header}>
          <ArrowLeftButton actionClick={handleHiddenModalDelete} />
          <h1>{object.name}</h1>
        </header>
        <div className={`${styles.modal_content_header_text} ${styles.modal_content_text}`}>
          <h2>{text}</h2>
          <ButtonGroup>
            <Button value={t("buttons.text-confirm")} type="submit" variant="button_confirm" onClick={() => handleDelete()}/>
            <Button value={t("buttons.text-cancel")} type="button" onClick={handleHiddenModalDelete} variant="button_cancel" />
          </ButtonGroup>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirmDelete
import React from 'react'
import Modal from './Modal'

import styles from './Modal.module.css'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'

import { deleteMedicine } from '../../slices/medicineSlice'
import { useDispatch } from 'react-redux'

const ModalConfirmDeleteMedicine = ({ medicine, hiddenModal }) => {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteMedicine(medicine.id));
    hiddenModal();
  }

  return (
    <Modal>
      <div className={styles.modal_content_minor}>
        <header className={styles.modal_content_header}>
          <ArrowLeftButton actionClick={hiddenModal} />
          <h1>{medicine.name}</h1>
        </header>
        <div className={styles.modal_content_header_text} style={{padding: '2em'}}>
          <h2>Deseja confirmar a exclusão da medicação?</h2>
          <ButtonGroup>
            <Button value="Confirmar" type="submit" variant="button_confirm" onClick={handleDelete}/>
            <Button value="Cancelar" type="button" onClick={hiddenModal} variant="button_cancel" />
          </ButtonGroup>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirmDeleteMedicine
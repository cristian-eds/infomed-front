import React from 'react'

import styles from './ModalAddMedicine.module.css'

import Modal from './Modal'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import ConfirmButton from '../Button/Button'
import Button from '../Button/Button'


const ModalAddMedicine = ({ showModal, setShowModal }) => {
    return (
        <>
            {showModal && (
                <Modal >
                    <div className={styles.modal_content}>
                        <header className={styles.modal_content_header}>
                            <ArrowLeftButton actionClick={() => setShowModal(false)} />
                            <h2 className={styles.modal_content_header_text}>Nova Medicação</h2>
                        </header>

                        <form className={styles.medication_form}>
                            <div className={styles.form_row}>
                                <label for="nome">Nome:</label>
                                <div className={styles.input_group}>
                                    <input type="text" id="nome" name="nome" value="Ibuprofeno" />
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label for="frequencia">Frequência:</label>
                                <div className={styles.input_group}>
                                    <input type="number" id="frequencia" name="frequencia" value="3" />
                                    <span class="unit">hrs</span>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label for="qtdDias">Qtd Dias:</label>
                                <div className={styles.input_group}>
                                    <input type="number" id="qtdDias" name="qtdDias" value="5" />
                                    <span class="unit">dias</span>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label for="dataHoraInicial">Dia e hora inicial:</label>
                                <div className={styles.input_group}>
                                    <input type="datetime-local" id="dataHoraInicial" name="dataHoraInicial" value="19/02/25 14:00" readonly />
                                </div>
                            </div>

                            <ButtonGroup>
                                <Button value="Cadastrar" type="submit" variant="button_confirm" />
                                <Button value="Cancelar" type="button" onClick={()=> setShowModal(false)} variant="button_cancel"/>
                            </ButtonGroup>
                        </form>
                    </div>
                </Modal>

            )}
        </>
    )
}

export default ModalAddMedicine
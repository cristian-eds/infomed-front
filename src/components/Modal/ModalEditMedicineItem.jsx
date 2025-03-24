import React from 'react'
import Modal from './Modal'

import styles from './Modal.module.css'

import DeleteButton from '../Button/DeleteButton'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'

const ModalEditMedicineItem = ({ showModal, setShowModal, medicine }) => {

    console.log(medicine);

    return (
        <>
            {showModal && (
                < Modal >
                    <div className={styles.modal_content}>
                        <header className={styles.modal_content_header}>
                            <ArrowLeftButton actionClick={() => setShowModal(false)} />
                                <div>
                                    <h2 className={styles.modal_content_header_text}>{medicine.name}</h2>
                                    <h3 className={styles.modal_content_header_text}>{medicine.sequency}/{medicine.total}</h3>
                                </div>
                            <DeleteButton />
                        </header>
                        <form className={styles.medication_form}>
                            <div className={styles.form_row}>
                                <label htmlFor="nome">Data e hora:</label>
                                <div className={styles.input_group}>
                                    <input type="datetime-local" id="dayHour" name="dayHour" value={medicine.dayHour} />
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="frequencia">Concluído:</label>
                                <div className={styles.input_group}>
                                    <input type="checkbox" name="conclusion" id="conclusion" value={medicine.conclusion} />
                                    <span className="unit"></span>
                                </div>
                            </div>

                            <ButtonGroup>
                                <Button value="Confirmar" type="submit" variant="button_confirm" />
                                <Button value="Cancelar" type="button" onClick={()=> setShowModal(false)} variant="button_cancel"/>
                            </ButtonGroup>
                        </form>
                    </div>
                </ Modal >
            )
            }

        </>
    )
}

export default ModalEditMedicineItem
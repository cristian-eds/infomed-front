import React, { useState } from 'react'
import Modal from './Modal'

import styles from './Modal.module.css'

import DeleteButton from '../Button/DeleteButton'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import { updateMedicineItem } from '../../slices/medicineSlice'

const ModalEditMedicineItem = ({ showModal, setShowModal, medicine }) => {

    const [dayHour, setDayHour] = useState(medicine.dayHour);
    const [conclusion, setConslusion] = useState(medicine.conclusion);
    
    const dispatch = useDispatch();


    const handleEdit = (e) => {
        e.preventDefault();
        const updatedData = {
            id: medicine.medicineItemId,
            conclusion,
            dayHour
        }

        dispatch(updateMedicineItem(updatedData));
        setShowModal(false);
    }

    return (
        <>
            {showModal && medicine &&(
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
                        <form className={styles.medication_form} onSubmit={handleEdit}>
                            <div className={styles.form_row}>
                                <label htmlFor="nome">Data e hora:</label>
                                <div className={styles.input_group}>
                                    <input type="datetime-local" id="dayHour" name="dayHour" value={dayHour} onChange={(e) => setDayHour(e.target.value)}/>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="frequencia">Concluído:</label>
                                <div className={styles.input_group}>
                                    <input type="checkbox" name="conclusion" id="conclusion" checked={conclusion} onChange={(e) => setConslusion(e.target.checked)} />
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
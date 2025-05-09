import React, { useEffect, useState } from 'react'
import Modal from './Modal'

import styles from './Modal.module.css'

import DeleteButton from '../Button/DeleteButton'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'

import { deleteMedicineItem, updateMedicineItem } from '../../slices/medicineItemSlice'
import { format } from 'date-fns'
import { convertToPatternLocalDateTime } from '../../utils/formatterDates'
import ModalConfirmDelete from './ModalConfirmDelete'

const ModalEditMedicineItem = ({ showModal, setCloseModal, medicine, dispatch }) => {

    const [dayHour, setDayHour] = useState(medicine.dayHour);
    const [conclusion, setConclusion] = useState(medicine.conclusion);
    const [conclusionDayHour, setConclusionDayHour] = useState(medicine.conclusionDayHour ? format(medicine.conclusionDayHour, 'yyyy-MM-dd hh:mm') : "");

    const [showModalDelete, setShowModalDelete] = useState(false);


    useEffect(() => {
        setDayHour(medicine.dayHour);
        setConclusion(medicine.conclusion)
    },[medicine])

    const handleEdit = (e) => {
        e.preventDefault();
        const updatedData = {
            id: medicine.medicineItemId,
            conclusion,
            dayHour,
            conclusionDayHour: convertToPatternLocalDateTime(conclusionDayHour)
        }

        dispatch(updateMedicineItem(updatedData));
        setCloseModal();
    }

    const handleAlterConclusion = (isConclusion) => {
        if (isConclusion) {
            setConclusionDayHour(format(Date.now(), 'yyyy-MM-dd hh:mm'));
        } else {
            setConclusionDayHour("");
        }
        setConclusion(isConclusion);
    }

    const handleHiddenModalDelete = () => {
        setShowModalDelete(false);
    }

    const handleDelete = () => {
        handleHiddenModalDelete();
        dispatch(deleteMedicineItem(medicine.medicineItemId));
        setCloseModal();
    }

    return (
        <>
            {showModal && medicine && (
                < Modal >
                    <div className={styles.modal_content}>
                        <header className={styles.modal_content_header}>
                            <ArrowLeftButton actionClick={() => setCloseModal()} />
                            <div>
                                <h2 className={styles.modal_content_header_text}>{medicine.name}</h2>
                                <h3 className={styles.modal_content_header_text}>{medicine.sequency}/{medicine.total}</h3>
                            </div>
                            <DeleteButton actionClick={() => setShowModalDelete(true)}/>
                        </header>
                        <form className={styles.medication_form} onSubmit={handleEdit}>
                            <div className={styles.form_row}>
                                <label htmlFor="nome">Data e hora:</label>
                                <div className={styles.input_group}>
                                    <input type="datetime-local" id="dayHour" name="dayHour" value={dayHour} onChange={(e) => setDayHour(e.target.value)} disabled />
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="frequencia">Concluído:</label>
                                <div className={styles.input_group}>
                                    <input type="checkbox" name="conclusion" id="conclusion" checked={conclusion} onChange={(e) => handleAlterConclusion(e.target.checked)} />
                                    <span className="unit"></span>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="nome">Data e hora que foi tomado:</label>
                                <div className={styles.input_group}>
                                    <input type="datetime-local" id="conclusionDayHour" name="conclusionDayHour" value={conclusionDayHour} onChange={(e) => setConclusionDayHour(e.target.value)} />
                                </div>
                            </div>

                            <ButtonGroup>
                                <Button value="Confirmar" type="submit" variant="button_confirm" />
                                <Button value="Cancelar" type="button" onClick={() => setCloseModal()} variant="button_cancel" />
                            </ButtonGroup>
                        </form>
                    </div>
                    {showModalDelete &&
                        <ModalConfirmDelete
                            object={medicine}
                            handleDelete={handleDelete}
                            text={"Confima a exclusão do medicamento?"}
                            handleHiddenModalDelete={handleHiddenModalDelete}
                        />}
                </ Modal >
            )
            }

        </>
    )
}

export default ModalEditMedicineItem
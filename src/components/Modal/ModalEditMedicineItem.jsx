import React, { useEffect, useState } from 'react'
import Modal from './Modal'

import { deleteMedicineItem, updateMedicineItem } from '../../slices/medicineItemSlice'
import { format } from 'date-fns'
import { convertToPatternLocalDateTime } from '../../utils/formatterDates'

import styles from './Modal.module.css'

import DeleteButton from '../Button/DeleteButton'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'
import ModalConfirmDelete from './ModalConfirmDelete'
import ModalContent from './FormModal/ModalContent'
import ModalHeader from './ModalHeader'
import FormModal from './FormModal/FormModal'
import FormModalRow from './FormModal/FormModalRow'
import FormInputGroup from './FormModal/FormInputGroup'
import MessageError from '../MessageError/MessageError'
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox'

const ModalEditMedicineItem = ({ showModal, setCloseModal, medicine, dispatch }) => {

    const [dayHour, setDayHour] = useState(medicine.dayHour);
    const [conclusion, setConclusion] = useState(medicine.conclusion);
    const [conclusionDayHour, setConclusionDayHour] = useState(medicine.conclusionDayHour ? format(medicine.conclusionDayHour, 'yyyy-MM-dd hh:mm') : "");
    const [validationErros, setValidationErros] = useState(null);

    const [showModalDelete, setShowModalDelete] = useState(false);


    useEffect(() => {
        setDayHour(medicine.dayHour);
        setConclusion(medicine.conclusion)
    }, [medicine])

    const handleEdit = (e) => {
        e.preventDefault();
        const erros = validateFields();
        if(erros) return;
        const updatedData = {
            id: medicine.medicineItemId,
            conclusion,
            dayHour,
            conclusionDayHour: convertToPatternLocalDateTime(conclusionDayHour)
        }

        dispatch(updateMedicineItem(updatedData));
        setCloseModal();
    }

    const validateFields = () => {

        let err = "";
        if(conclusion && (conclusionDayHour === null || conclusionDayHour.length <= 1) ) {
            err = "Insira um data de conclusão";
        }

        setValidationErros(err);
        return err;
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
                    <ModalContent>
                        <ModalHeader>
                            <ArrowLeftButton actionClick={() => setCloseModal()} />
                            <div>
                                <h2 className={styles.modal_content_header_text}>{medicine.name}</h2>
                                <h3 className={styles.modal_content_header_text}>{medicine.sequency}/{medicine.total}</h3>
                            </div>
                            <div className={styles.actions_buttons}>
                                <DeleteButton actionClick={() => setShowModalDelete(true)} />
                            </div>
                        </ModalHeader>
                        <FormModal action={handleEdit}>
                            <FormModalRow>
                                <label htmlFor="personName">Pessoa:</label>
                                <FormInputGroup disabled={true}>
                                    <input type="text" id="personName" name="personName" value={medicine.personName} disabled className={styles.disabled}/>
                                </FormInputGroup>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="dayHour">Data e hora:</label>
                                <FormInputGroup disabled={true}>
                                    <input type="datetime-local" id="dayHour" name="dayHour" value={dayHour} className={styles.disabled} disabled />
                                </FormInputGroup>
                            </FormModalRow>

                            <FormModalRow>
                                <label htmlFor="frequencia">Concluído:</label>
                                <FormInputGroup>
                                    <CustomCheckBox checked={conclusion} handleCheck={(e) => handleAlterConclusion(e.target.checked)} centralized={false}/>
                                    <span className="unit"></span>
                                </FormInputGroup>
                            </FormModalRow>

                            <FormModalRow>
                                <label htmlFor="conclusionDayHour">Quando foi tomado:</label>
                                <FormInputGroup>
                                    <input type="datetime-local" id="conclusionDayHour" name="conclusionDayHour" value={conclusionDayHour} onChange={(e) => setConclusionDayHour(e.target.value)} />
                                </FormInputGroup>
                            </FormModalRow>

                            <MessageError message={validationErros}/>

                            <ButtonGroup>
                                <Button value="Confirmar" type="submit" variant="button_confirm" />
                                <Button value="Cancelar" type="button" onClick={() => setCloseModal()} variant="button_cancel" />
                            </ButtonGroup>
                        </FormModal>
                    </ModalContent>

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
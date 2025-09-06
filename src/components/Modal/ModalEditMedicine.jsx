import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteMedicine, resetSuccess, updateMedicine } from '../../slices/medicineSlice'

import styles from './Modal.module.css'

import { convertToPatternLocalDateTime } from '../../utils/formatterDates'

import useToggle from '../../hooks/useToggle'

import ArrowLeftButton from '../Button/ArrowLeftButton'
import DeleteButton from '../Button/DeleteButton'
import FormModal from './FormModal/FormModal'
import FormModalRow from './FormModal/FormModalRow'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'
import FormInputGroup from './FormModal/FormInputGroup'
import ModalContent from './FormModal/ModalContent'
import Modal from './Modal'
import ModalHeader from './ModalHeader'
import ModalConfirmDelete from './ModalConfirmDelete'
import MessageError from '../MessageError/MessageError'
import DuplicateButton from '../Button/DuplicateButton'
import ModalConfirm from './ModalConfirm'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/AuthContext'

const ModalEditMedicine = ({ showModal, hiddenModal, medicine, dispatch, success, handleDuplicateMedicine }) => {

    const {t} = useTranslation();
    const {role} = useContext(AuthContext);

    const [name, setName] = useState(medicine.name);
    const [idPerson, setIdPerson] = useState(medicine.person?.id);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const {state: showModalConfirmDuplicate, toggle} = useToggle();

    const [validationErros, setValidationErros] = useState(null);

    const { personList } = useSelector(state => state.person);

    const handleSubmit = (e) => {
        e.preventDefault();
        const erros = validateFields();
        if (erros) return;
        const updatedMedicine = {
            id: medicine.id,
            name,
            idPerson
        }
        dispatch(updateMedicine(updatedMedicine));
    }

    if (success === true) {
        hiddenModal();
        setTimeout(() => {
            dispatch(resetSuccess())
        }, 1000)
    }

    const validateFields = () => {

        let err = "";
        if (name === null || name.length <= 1) {
            err = t('validation-messages.valid-name');
        }
        if (idPerson === null || idPerson.length == 0) {
            err = t('validation-messages.valid-person');
        }

        setValidationErros(err);
        return err;
    }

    const handleDelete = () => {
        dispatch(deleteMedicine(medicine.id));
        setShowModalDelete(false);
    }

    const handleDuplicate = () => {
        toggle();
        hiddenModal();
        handleDuplicateMedicine(medicine);
    }

    return (
        <>
            {showModal && <>
                <Modal>
                    <ModalContent>
                        <ModalHeader>
                            <ArrowLeftButton actionClick={() => hiddenModal()} />
                            <div>
                                <h2 className={styles.modal_content_header_text}>{medicine.name}</h2>
                            </div>
                            {role !== "GUEST" && 
                            <div className={styles.actions_buttons}>
                                <DuplicateButton actionClick={toggle}/>
                                <DeleteButton actionClick={() => setShowModalDelete(true)} />
                            </div>}
                        </ModalHeader>
                        <FormModal action={handleSubmit}>
                            <FormModalRow>
                                <label htmlFor="name">{t('modals.label-name')}</label>
                                <FormInputGroup>
                                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </FormInputGroup>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="person">{t('modals.label-related-person')}</label>
                                <FormInputGroup>
                                    <select name="person" id="person" value={idPerson} onChange={(e) => setIdPerson(e.target.value)}>
                                        {medicine.person === null && <option value="">-Selecione-</option>}
                                        {personList.map(personState => (
                                            <option key={personState.id} value={personState.id}>{personState.name}</option>
                                        ))}
                                    </select>
                                </FormInputGroup>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="creationDate">{t('modals.label-registration-date')}</label>
                                <FormInputGroup disabled={true}>
                                    <input type="datetime-local" id="creationDate" name="creationDate" value={convertToPatternLocalDateTime(medicine.registrationDate)} disabled className={styles.disabled} />
                                </FormInputGroup>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="frequence">{t('modals.label-frequence')}</label>
                                <FormInputGroup disabled={true}>
                                    <input type="text" id="frequence" name="frequence" value={medicine.frequencyHours} disabled className={styles.disabled} />
                                    <span className="unit">{t('modals.unit-hours')}</span>
                                </FormInputGroup>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="totDays">{t('modals.label-qty-days')}</label>
                                <FormInputGroup disabled={true}>
                                    <input type="text" id="totDays" name="totDays" value={medicine.totalDays} disabled className={styles.disabled} />
                                    <span className="unit">{t('modals.unit-days')}</span>
                                </FormInputGroup>
                            </FormModalRow>

                            <MessageError message={validationErros} />

                            <ButtonGroup>
                                <Button value={t('buttons.text-confirm')} type="submit" variant="button_confirm" />
                                <Button value={t('buttons.text-cancel')} type="button" onClick={hiddenModal} variant="button_cancel" />
                            </ButtonGroup>
                        </FormModal>
                    </ModalContent>
                </Modal>

                {showModalDelete &&
                    <ModalConfirmDelete
                        object={medicine}
                        handleDelete={handleDelete}
                        text={t('modals.question-confirm-delete-medicine')}
                        handleHiddenModalDelete={() => setShowModalDelete(false)}
                    />}
                {showModalConfirmDuplicate && 
                    <ModalConfirm  
                        object={medicine}
                        handleConfirm={handleDuplicate}
                        text={"Confirma duplicação de medicamento?"}
                        handleHiddenModal={toggle}
                    />
                    
                }
            </>}
        </>
    )
}

export default ModalEditMedicine
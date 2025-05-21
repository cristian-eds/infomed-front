import styles from './Modal.module.css'

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

import { convertToPatternLocalDateTime } from '../../utils/formatterDates'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { resetSuccess, updateMedicine } from '../../slices/medicineSlice'

const ModalEditMedicine = ({ showModal, hiddenModal, medicine, dispatch, success }) => {

    const [name, setName] = useState(medicine.name);
    const [idPerson, setIdPerson] = useState(medicine.person?.id);

    const { personList } = useSelector(state => state.person);

    const handleSubmit = (e) => {
        e.preventDefault();
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
                            <DeleteButton actionClick={() => null} />
                        </ModalHeader>
                        <FormModal action={handleSubmit}>
                            <FormModalRow>
                                <label htmlFor="name">Nome:</label>
                                <FormInputGroup>
                                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </FormInputGroup>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="person">Pessoa vínculada:</label>
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
                                <label htmlFor="creationDate">Data criação:</label>
                                <FormInputGroup>
                                    <input type="datetime-local" id="creationDate" name="creationDate" value={convertToPatternLocalDateTime(medicine.registrationDate)} disabled />
                                </FormInputGroup>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="frequence">Frequência:</label>
                                <FormInputGroup>
                                    <input type="text" id="frequence" name="frequence" value={medicine.frequencyHours} disabled />
                                    <span className="unit">hrs</span>
                                </FormInputGroup>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="totDays">Total dias:</label>
                                <FormInputGroup>
                                    <input type="text" id="totDays" name="totDays" value={medicine.totalDays} disabled />
                                    <span className="unit">dias</span>
                                </FormInputGroup>
                            </FormModalRow>

                            <ButtonGroup>
                                <Button value="Confirmar" type="submit" variant="button_confirm" />
                                <Button value="Cancelar" type="button" onClick={hiddenModal} variant="button_cancel" />
                            </ButtonGroup>
                        </FormModal>
                    </ModalContent>
                </Modal>
            </>}
        </>
    )
}

export default ModalEditMedicine
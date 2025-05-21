import Modal from './Modal'
import ModalHeader from './ModalHeader'

import styles from './Modal.module.css'

import ArrowLeftButton from '../Button/ArrowLeftButton'
import DeleteButton from '../Button/DeleteButton'
import FormModal from './FormModal/FormModal'
import FormModalRow from './FormModal/FormModalRow'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'

import { convertToPatternLocalDateTime } from '../../utils/formatterDates'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { resetSuccess, updateMedicine } from '../../slices/medicineSlice'


const ModalEditMedicine = ({ showModal, hiddenModal ,medicine, dispatch, success }) => {

    const [name, setName] = useState(medicine.name);
    const [idPerson, setIdPerson] = useState(medicine.person?.id);

    const {personList} = useSelector(state => state.person);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMedicine = {
            id: medicine.id,
            name,
            idPerson
        }
        dispatch(updateMedicine(updatedMedicine));
    }

    if(success === true) {
        hiddenModal();
        setTimeout(() => {
            dispatch(resetSuccess())
        },1000)
    }

    return (
        <>
            {showModal && <>
                <Modal>
                    <div className={styles.modal_content}>
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
                                <div className={styles.input_group}>
                                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="person">Pessoa vínculada:</label>
                                <div className={styles.input_group}>
                                    <select name="person" id="person" value={idPerson} onChange={(e) => setIdPerson(e.target.value)}>
                                        {medicine.person === null &&  <option value="">-Selecione-</option> }
                                        {personList.map(personState => (
                                            <option key={personState.id} value={personState.id}>{personState.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="creationDate">Data criação:</label>
                                <div className={styles.input_group}>
                                    <input type="datetime-local" id="creationDate" name="creationDate" value={convertToPatternLocalDateTime(medicine.registrationDate)} disabled />
                                </div>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="frequence">Frequência:</label>
                                <div className={styles.input_group}>
                                    <input type="text" id="frequence" name="frequence" value={medicine.frequencyHours} disabled />
                                    <span className="unit">hrs</span>
                                </div>
                            </FormModalRow>
                            <FormModalRow>
                                <label htmlFor="totDays">Total dias:</label>
                                <div className={styles.input_group}>
                                    <input type="text" id="totDays" name="totDays" value={medicine.totalDays} disabled />
                                    <span className="unit">dias</span>
                                </div>
                            </FormModalRow>

                            <ButtonGroup>
                                <Button value="Confirmar" type="submit" variant="button_confirm" />
                                <Button value="Cancelar" type="button" onClick={hiddenModal} variant="button_cancel" />
                            </ButtonGroup>
                        </FormModal>
                    </div>
                </Modal>
            </>}
        </>
    )
}

export default ModalEditMedicine
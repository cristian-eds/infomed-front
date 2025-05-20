import Modal from './Modal'
import ModalHeader from './ModalHeader'

import styles from './Modal.module.css'

import ArrowLeftButton from '../Button/ArrowLeftButton'
import DeleteButton from '../Button/DeleteButton'
import FormModal from './FormModal/FormModal'
import FormModalRow from './FormModal/FormModalRow'

import { convertToPatternLocalDateTime } from '../../utils/formatterDates'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'

const ModalEditMedicine = ({ showModal, hiddenModal ,medicine }) => {

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
                        <FormModal>
                            <FormModalRow>
                                <label htmlFor="personName">Pessoa:</label>
                                <div className={styles.input_group}>
                                    <input type="text" id="personName" name="personName" value={medicine.personName} disabled />
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
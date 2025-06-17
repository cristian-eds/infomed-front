import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import styles from './Modal.module.css'

import Modal from './Modal'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'
import ModalHeader from './ModalHeader'
import FormModal from './FormModal/FormModal'
import FormModalRow from './FormModal/FormModalRow'
import FormInputGroup from './FormModal/FormInputGroup'
import ModalContent from './FormModal/ModalContent'
import MessageError from '../MessageError/MessageError'

import { format } from 'date-fns'
import { convertToPatternLocalDateTime } from '../../utils/formatterDates'

import { fetchPerson } from '../../slices/personSlice'
import { useTranslation } from 'react-i18next'

const ModalAddMedicine = ({ showModal, handleCloseModal, actionToDispatch, dispatch, medicineDuplicate }) => {

    const {t} = useTranslation();

    const [name, setName] = useState(medicineDuplicate?.name ?? "");
    const [frequency, setFrequency] = useState(medicineDuplicate?.frequencyHours || "");
    const [totalDays, setTotalDays] = useState(medicineDuplicate?.totalDays || "");
    const [initialDate, setInitialDate] = useState(format(new Date(), 'yyyy-MM-dd hh:mm'));
    const [idPerson, setIdPerson] = useState(medicineDuplicate?.person.id ?? "");

    const [validationErros, setValidationErros] = useState(null);

    const { personList } = useSelector(state => state.person);

    useEffect(() => {
        dispatch(fetchPerson())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const erros = validateFields();
        if(erros) return;
        const newMedicine = {
            name,
            totalDays,
            frequencyHours: frequency,
            initialDateTime: convertToPatternLocalDateTime(initialDate),
            idPerson
        }

        dispatch(actionToDispatch(newMedicine));
        handleCloseModal();
    }

    const validateFields = () => {
        let err = null;
        if(name === null || name.length <= 1) {
            err = t('validation-messages.valid-name');
        }
        if(frequency === null || frequency.length == 0) {
            err = t('validation-messages.valid-frequence');
        }
        if(totalDays === null || totalDays < 0 || totalDays == 0) {
            err = t('validation-messages.valid-qty-days');
        }
        if(idPerson === null || idPerson.length == 0) {
            err = t('validation-messages.valid-person');
        }
        setValidationErros(err);
        return err;
    }


    return (
        <>
            {showModal && (
                <Modal >
                    <ModalContent>
                        <ModalHeader>
                            <ArrowLeftButton actionClick={handleCloseModal} />
                            <h2 className={styles.modal_content_header_text}>{t('modals.title-add-medicine')}</h2>
                        </ModalHeader>

                        <FormModal action={handleSubmit}>
                            <FormModalRow>
                                <label htmlFor="name">{t('modals.label-name')}</label>
                                <FormInputGroup>
                                    <input type="text" id="name" name="name" placeholder={t('modals.placeholder-name')} value={name} onChange={(e) => setName(e.target.value)} />
                                </FormInputGroup>
                            </FormModalRow>

                            <FormModalRow>
                                <label htmlFor="frequence">{t('modals.label-frequence')}</label>
                                <FormInputGroup>
                                    <input type="number" id="frequence" name="frequence" placeholder={t('modals.placeholder-frequence')} value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                                    <span className="unit">hrs</span>
                                </FormInputGroup>
                            </FormModalRow>

                            <FormModalRow>
                                <label htmlFor="qtdDias">{t('modals.label-qty-days')}</label>
                                <FormInputGroup>
                                    <input type="number" id="qtdDias" name="qtdDias" placeholder={t('modals.placeholder-qty-days')} value={totalDays} onChange={(e) => setTotalDays(e.target.value)} />
                                    <span className="unit">dias</span>
                                </FormInputGroup>
                            </FormModalRow>

                            <FormModalRow>
                                <label htmlFor="dataHoraInicial">{t('modals.label-initial-schedule')}</label>
                                <FormInputGroup>
                                    <input type="datetime-local" id="dataHoraInicial" name="dataHoraInicial" value={initialDate} onChange={(e) => setInitialDate(e.target.value)} />
                                </FormInputGroup>
                            </FormModalRow>

                            <FormModalRow>
                                <label htmlFor="person">{t('modals.label-related-person')}</label>
                                <FormInputGroup>
                                    <select name="person" id="person" value={idPerson} onChange={(e) => setIdPerson(e.target.value)}>
                                        <option value="">{t('modals.placeholder-default-select')}</option>
                                        {personList.map(person => (
                                            <option key={person.id} value={person.id}>{person.name}</option>
                                        ))}
                                    </select>
                                </FormInputGroup>
                            </FormModalRow>

                            <MessageError message={validationErros}/>

                            <ButtonGroup>
                                <Button value={t("buttons.text-save")} type="submit" variant="button_confirm" />
                                <Button value={t("buttons.text-cancel")} type="button" onClick={handleCloseModal} variant="button_cancel" />
                            </ButtonGroup>
                        </FormModal>
                    </ModalContent>
                </Modal>

            )}
        </>
    )
}

export default ModalAddMedicine
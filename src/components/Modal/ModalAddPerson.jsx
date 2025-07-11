import { useState } from 'react'
import Modal from './Modal'

import styles from './Modal.module.css'

import ArrowLeftButton from '../Button/ArrowLeftButton';
import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';

import { createPerson } from '../../slices/personSlice';
import ModalContent from './FormModal/ModalContent';
import ModalHeader from './ModalHeader';
import FormModal from './FormModal/FormModal';
import FormModalRow from './FormModal/FormModalRow';
import FormInputGroup from './FormModal/FormInputGroup';
import MessageError from '../MessageError/MessageError';
import { useTranslation } from 'react-i18next';

const ModalAddPerson = ({ setShowModal, dispatch }) => {

    const {t} = useTranslation();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [image, setImage] = useState("");

    const [validationErros, setValidationErros] = useState(null);

    const handleConfirm = (e) => {
        e.preventDefault();
        const erros = validateFields();
        if(erros) return;
        const data = {
            name,
            phone,
            birthDate,
            file: image
        }
        dispatch(createPerson(data));
        setShowModal(false);
    }

     const validateFields = () => {
        let err = "";

        if(name === null || name.length <= 1) {
            err = t('validation-messages.valid-name');
        }

        setValidationErros(err);
        return err;
    }

    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <ArrowLeftButton actionClick={() => setShowModal(false)} />
                    <div>
                        <h2 className={styles.modal_content_header_text}>{t('modals.title-add-person')}</h2>
                    </div>
                </ModalHeader>
                <FormModal action={handleConfirm}>
                    <FormModalRow>
                        <label htmlFor="name">{t('modals.label-name')}</label>
                        <FormInputGroup>
                            <input type="text" id="name" placeholder={t('modals.placeholder-name-person')} name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormInputGroup>
                    </FormModalRow>
                    <FormModalRow>
                        <label htmlFor="phone">{t('modals.label-phone')}</label>
                        <FormInputGroup>
                            <input type="text" id="phone" placeholder={t('modals.placeholder-phone')} name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </FormInputGroup>
                    </FormModalRow>

                    <FormModalRow>
                        <label htmlFor="birthDate">{t('modals.label-birthdate')}</label>
                        <FormInputGroup>
                            <input type="date" id="birthDate" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        </FormInputGroup>
                    </FormModalRow>

                    <FormModalRow>
                        <label htmlFor="image">{t('modals.label-image')}</label>
                        <FormInputGroup>
                            <input type="file" id="image" accept="image/png, image/jpeg" capture="user|environment" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                        </FormInputGroup>
                    </FormModalRow>

                    <MessageError message={validationErros}/>

                    <ButtonGroup>
                        <Button value={t('buttons.text-confirm')} type="submit" variant="button_confirm" />
                        <Button value={t('buttons.text-cancel')} type="button" onClick={() => setShowModal(false)} variant="button_cancel" />
                    </ButtonGroup>
                </FormModal>
            </ModalContent>
        </Modal>
    )
}

export default ModalAddPerson
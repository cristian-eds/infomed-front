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

const ModalAddPerson = ({ setShowModal, dispatch }) => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const handleConfirm = (e) => {
        e.preventDefault();
        const data = {
            name,
            phone,
            birthDate
        }
        dispatch(createPerson(data));
        setShowModal(false);
    }

    return (
        <Modal>
            <ModalContent>
                <ModalHeader>
                    <ArrowLeftButton actionClick={() => setShowModal(false)} />
                    <div>
                        <h2 className={styles.modal_content_header_text}>Cadastrar Pessoa</h2>
                    </div>
                </ModalHeader>
                <FormModal action={handleConfirm}>
                    <FormModalRow>
                        <label htmlFor="name">Nome:</label>
                        <FormInputGroup>
                            <input type="text" id="name" placeholder="Insira o nome da pessoa:" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormInputGroup>
                    </FormModalRow>
                    <FormModalRow>
                        <label htmlFor="phone">Telefone:</label>
                        <FormInputGroup>
                            <input type="text" id="phone" placeholder="Insira o teledone da pessoa:" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </FormInputGroup>
                    </FormModalRow>

                    <FormModalRow>
                        <label htmlFor="birthDate">Data de Nascimento:</label>
                        <FormInputGroup>
                            <input type="date" id="birthDate" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        </FormInputGroup>
                    </FormModalRow>

                    <ButtonGroup>
                        <Button value="Cadastrar" type="submit" variant="button_confirm" />
                        <Button value="Cancelar" type="button" onClick={() => setShowModal(false)} variant="button_cancel" />
                    </ButtonGroup>
                </FormModal>
            </ModalContent>
        </Modal>
    )
}

export default ModalAddPerson
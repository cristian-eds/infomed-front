import { useState } from 'react'
import Modal from './Modal'

import styles from './Modal.module.css'

import ArrowLeftButton from '../Button/ArrowLeftButton';
import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';

import { createPerson } from '../../slices/personSlice';

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
            <div className={styles.modal_content}>
                <header className={styles.modal_content_header}>
                    <ArrowLeftButton actionClick={() => setShowModal(false)} />
                    <div>
                        <h2 className={styles.modal_content_header_text}>Cadastrar Pessoa</h2>
                    </div>
                </header>
                <form className={styles.medication_form} onSubmit={handleConfirm}>
                    <div className={styles.form_row}>
                        <label htmlFor="name">Nome:</label>
                        <div className={styles.input_group}>
                            <input type="text" id="name" placeholder="Insira o nome da pessoa:" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.form_row}>
                        <label htmlFor="phone">Telefone:</label>
                        <div className={styles.input_group}>
                            <input type="text" id="phone" placeholder="Insira o teledone da pessoa:" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.form_row}>
                        <label htmlFor="birthDate">Data de Nascimento:</label>
                        <div className={styles.input_group}>
                            <input type="date" id="birthDate" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        </div>
                    </div>

                    <ButtonGroup>
                        <Button value="Cadastrar" type="submit" variant="button_confirm" />
                        <Button value="Cancelar" type="button" onClick={() => setShowModal(false)} variant="button_cancel" />
                    </ButtonGroup>
                </form>
            </div>
        </Modal>
    )
}

export default ModalAddPerson
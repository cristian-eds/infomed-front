import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { deleteImagePerson, updateImagePerson } from '../../slices/personSlice';

import ArrowLeftButton from '../Button/ArrowLeftButton';
import DeleteButton from '../Button/DeleteButton';
import FormInputGroup from './FormModal/FormInputGroup';
import FormModalRow from './FormModal/FormModalRow';
import ModalContent from './FormModal/ModalContent';
import Modal from './Modal'

import styles from './Modal.module.css';
import ModalHeader from './ModalHeader';
import FormModal from './FormModal/FormModal';
import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import ModalConfirmDelete from './ModalConfirmDelete';


const ModalEditImage = ({ showModal, imgSrc, closeModal }) => {

    const { t } = useTranslation();

    const { detailsPerson } = useSelector(state => state.person);

    const dispatch = useDispatch();

    const [newImage, setNewImage] = useState("");
    const [inputKey, setInputKey] = useState(Date.now());
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCancel = () => {
        setNewImage("");
        setInputKey(Date.now());
    }

    const handleDelete = () => {
        setShowModalDelete(false);
        dispatch(deleteImagePerson(detailsPerson.id))
    }

    const handleSaveImage = (e) => {
        e.preventDefault();
        if (newImage) {
            dispatch(updateImagePerson({
                file: newImage,
                personId: detailsPerson.id
            }))
        }
        setTimeout(
            () => handleCancel(),
            100
        )
    }

    const verifyIfNotDefaultImage = () => imgSrc !== '/src/assets/perfil.png';


    return (
        <>
            {showModal &&
                <Modal>
                    <ModalContent>
                        <ModalHeader>
                            <ArrowLeftButton actionClick={closeModal} />
                            <div>
                                <h2 className={styles.modal_content_header_text}>Image</h2>
                            </div>
                            {verifyIfNotDefaultImage() &&
                                <div className={styles.actions_buttons}>
                                    <DeleteButton actionClick={() => setShowModalDelete(true)} />
                                </div>
                            }

                        </ModalHeader>

                        <img key={inputKey} src={imgSrc} alt={t('page-person-details.text-alt-image-person')} style={{ height: '50%' }} />

                        <FormModal>
                            <p>{t('modals.label-change-image')}</p>
                            <FormModalRow>
                                <label htmlFor="image">{t('modals.label-image')}</label>
                                <FormInputGroup>
                                    <input key={inputKey} type="file" id="image" accept="image/png, image/jpeg" capture="user|environment" name="image" onChange={(e) => setNewImage(e.target.files[0])} />
                                </FormInputGroup>
                            </FormModalRow>

                            {newImage &&
                                <ButtonGroup>
                                    <Button value={t("buttons.text-save")} type="submit" variant="button_confirm" onClick={handleSaveImage} />
                                    <Button value={t("buttons.text-cancel")} type="button" onClick={handleCancel} variant="button_cancel" />
                                </ButtonGroup>
                            }
                        </FormModal>
                    </ModalContent>
                    {showModalDelete &&
                        <ModalConfirmDelete
                            object={{ name: t('modals.label-image') }}
                            handleDelete={handleDelete}
                            text={t('modals.question-confirm-delete-image')}
                            handleHiddenModalDelete={() => setShowModalDelete(false)}
                        />}
                </Modal>
            }
        </>
    )
}

export default ModalEditImage
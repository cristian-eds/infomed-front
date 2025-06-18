import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword, fetchUser, updateUser } from '../../slices/userSlice';

import ButtonGroup from '../../components/Button/ButtonGroup';
import Button from '../../components/Button/Button';
import HistoricLog from '../../components/HistoricLog/HistoricLog';

import { toast, ToastContainer } from 'react-toastify';

import styles from './Profile.module.css';
import { useTranslation } from 'react-i18next';

const Profile = ({ userContext }) => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const { user, error: serverError } = useSelector(state => state.user);

    const email = userContext;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [error, setError] = useState("");

    const [editing, setEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        dispatch(fetchUser(userContext))
    }, [dispatch, userContext])

    useEffect(() => {
        if(user.name) {
            setName(user.name);
        }
    }, [user])

    useEffect(() => {
        setError(serverError);
    }, [serverError])

    const generateButtons = (confirmAction, cancelAction) => (
        <ButtonGroup>
            <Button type="submit" value={t('buttons.text-confirm')} variant="button_confirm" onClick={confirmAction} />
            <Button type="button" value={t('buttons.text-cancel')} variant="button_cancel" onClick={cancelAction} />
        </ButtonGroup>
    )

    const generateInputsChangingPassword = () => (
        <>
            <div className={styles.form_row}>
                <label htmlFor="password">{t('modals.label-current-password')}</label>
                <div className={styles.container_info_row}>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className={styles.form_row}>
                <label htmlFor="newPassword">{t('modals.label-new-password')}</label>
                <div className={styles.container_info_row}>
                    <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
            </div>
            <div className={styles.form_row}>
                <label htmlFor="confirmNewPassword">{t('modals.label-repeat-new-password')}</label>
                <div className={styles.container_info_row}>
                    <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                </div>
            </div>
            {generateButtons(handleChangePassword, () => setChangingPassword(false))}
        </>
    )


    const handleChangePassword = (e) => {
        e.preventDefault();

        const validationsErrors = validatePasswordChange(password, newPassword, confirmNewPassword);
        setError(validationsErrors);

        if (validationsErrors) return;

        const data = {
            id: user.id,
            atualization: {
                currentPassword: password,
                newPassword,
            },
            handleSuccessChangePassword
        }
        dispatch(changeUserPassword(data));
    }

    const validatePasswordChange = (password, newPassword, confirmNewPassword) => {
        let errors = "";
        if (!password || !newPassword || !confirmNewPassword) {
            errors = t('validation-messages.valid-fields-requireds');
        }
        if (newPassword !== confirmNewPassword) {
            errors = t('validation-messages.valid-confirm-new-password');
        }
        if (password?.length < 4 || newPassword?.length < 4 || confirmNewPassword?.length < 4) {
            errors = t('validation-messages.valid-password-lenght');
        }
        return errors;
    }

    const handleSuccessChangePassword = () => {
        toast.success(t('toast-messages.text-successfully-change-password'));
        setEditing(false);
        setChangingPassword(false);
        setPassword("");
        setConfirmNewPassword("");
        setNewPassword("");
    }

    const handleSuccesUpdate = () => {
        toast.success(t('toast-messages.text-successfully-update-user'));
        setEditing(false);
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        let validations = validateUpdateUser(name);

        if (validations) return;

        const data = {
            id: user.id,
            user: {
                name,
                email
            },
            handleSuccesUpdate
        }

        dispatch(updateUser(data));
    }

    const validateUpdateUser = (name) => {
        let validationsErrors = "";
        if (!name || name.length < 3) validationsErrors = t('validation-messages.valid-name-lenght');
        return validationsErrors;
    }

  

    return (
        <div className='container_main'>
            <header className={styles.header}>
                <h1>{user.name}</h1>
            </header>
            <form className={styles.container_profile}>
                <div className={styles.container_profile_title}>
                    <h3>{t('page-profile.text-information')}</h3>
                    {!changingPassword && <p onClick={() => setEditing(true)}>{editing ? t('page-profile.text-editing-information') : t('page-profile.text-edit-information')}</p>}
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="name">{t('modals.label-name')}</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} readOnly={changingPassword || !editing} disabled={!editing} />
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="email">{t('modals.label-email')}</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="email" name="email" value={email} readOnly disabled/>
                    </div>
                </div>
                {changingPassword && generateInputsChangingPassword()}
                {editing && generateButtons(handleUpdateUser, () => setEditing(false))}
                {error && <p className={styles.container_profile_error}>{error}</p>}
                {!editing && !changingPassword && <p style={{textAlign: 'left'}} onClick={() => setChangingPassword(true)}>{t('page-profile.text-change-password')}</p>}

            </form>

            <section className={styles.container_profile}>
                <HistoricLog />
            </section>
            <ToastContainer />
        </div>
    )
}

export default Profile
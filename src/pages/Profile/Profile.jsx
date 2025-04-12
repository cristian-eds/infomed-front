import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword, fetchUser, updateUser } from '../../slices/userSlice';

import styles from './Profile.module.css'

import Table from '../../components/Table/Table';
import ButtonGroup from '../../components/Button/ButtonGroup';
import Button from '../../components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import HistoricLog from '../../components/HistoricLog/HistoricLog';

const Profile = ({ userContext }) => {

    const dispatch = useDispatch();

    const { user, error: serverError } = useSelector(state => state.user);

    const email = userContext;

    const [name, setName] = useState(user.name)
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
        setName(user.name);
    }, [user])

    useEffect(() => {
        setError(serverError);
    }, [serverError])

    const generateButtons = (confirmAction, cancelAction) => (
        <ButtonGroup>
            <Button type="submit" value="Confirmar" variant="button_confirm" onClick={confirmAction} />
            <Button type="button" value="Cancelar" variant="button_cancel" onClick={cancelAction} />
        </ButtonGroup>
    )

    const generateInputsChangingPassword = () => (
        <>
            <div className={styles.form_row}>
                <label htmlFor="password">Current Password:</label>
                <div className={styles.container_info_row}>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className={styles.form_row}>
                <label htmlFor="newPassword">New Password:</label>
                <div className={styles.container_info_row}>
                    <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
            </div>
            <div className={styles.form_row}>
                <label htmlFor="confirmNewPassword">Confirm New Password:</label>
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
            errors = "All fields are required.";
        }
        if (newPassword !== confirmNewPassword) {
            errors = "New password doesn't match confirmation";
        }
        if (password?.length < 4 || newPassword?.length < 4 || confirmNewPassword?.length < 4) {
            errors = "Password must be at least four characters long.";
        }
        return errors;
    }

    const handleSuccessChangePassword = () => {
        toast.success("Successfully changing password.");
        setEditing(false);
        setChangingPassword(false);
        setPassword("");
        setConfirmNewPassword("");
        setNewPassword("");
    }

    const handleSuccesUpdate = () => {
        toast.success("Updating user successfully.");
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
        if (!name || name.length < 3) validationsErrors = "Name is required and must be at least three characters long";
        return validationsErrors;
    }

    return (
        <div className='container_main'>
            <header className={styles.header}>
                <h1>{user.name}</h1>
            </header>
            <form className={styles.container_profile}>
                <div className={styles.container_profile_title}>
                    <h3>Informações da conta</h3>
                    {!changingPassword && <p onClick={() => setEditing(true)}>{editing ? "Editando informações" : "Editar informações"}</p>}
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="name">Nome:</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} readOnly={changingPassword || !editing} />
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="email">Email:</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="email" name="email" value={email} readOnly />
                    </div>
                </div>
                {changingPassword && generateInputsChangingPassword()}
                {editing && generateButtons(handleUpdateUser, () => setEditing(false))}
                {error && <p className={styles.container_profile_error}>{error}</p>}
                {!editing && !changingPassword && <p onClick={() => setChangingPassword(true)}>Alterar senha</p>}

            </form>

            <section className={styles.container_profile}>
                <HistoricLog />
            </section>
            <ToastContainer />
        </div>
    )
}

export default Profile
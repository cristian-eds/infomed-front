import React, { useState } from 'react'
import { useNavigate } from 'react-router';

import logo from '../../assets/Infomed.png'

import styles from '../Login/Login.module.css'
import ButtonGroup from '../../components/Button/ButtonGroup';
import Button from '../../components/Button/Button';

import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Register = ({ register, loading }) => {

    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [redirecting, setRedirecting] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        if(password.length <= 3) {
            setError("Password must be at least four characters long.")
            return;
        }

        const userData = {
            email,
            name,
            password,
            role
        }

        const res = await register(userData);

        if (res.email) {
            setRedirecting(true);
            toast.success("User created! Redirecting to login.");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }

        if (res.status === 409) {
            setError(res.description);
        }
    }

    return (
        <div className={styles.container_login}>
            <div className={styles.img}>
                <img src={logo} alt="Image Logo" />
            </div>
            <h2 className='title_text_color'>{t('page-register.text-register')}</h2>
            <form className={styles.login} onSubmit={handleRegister}>
                <div className={styles.roles}>
                    <div className={`${role === "USER" && styles.roles_itens__active} ${styles.roles_itens}`} onClick={() => setRole("USER")}>{t('page-register.text-type-normal-user')}</div>
                    <div className={`${role === "ADMIN" && styles.roles_itens__active} ${styles.roles_itens}`} onClick={() => setRole("ADMIN")}>{t('page-register.text-type-adm-user')}</div>
                </div>
                <input type="text" name="name" id="name" placeholder={t('page-register.placeholder-name')} value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="email" id="email" placeholder={t('page-register.placeholder-email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder={t('page-register.placeholder-password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder={t('page-register.placeholder-confirm-password')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {error && <p className={styles.error}>{error}</p>}

                {!redirecting && (
                    <ButtonGroup>
                        <Button type="submit" value={t('page-register.value-button-confirm-register')} variant="button_confirm" disabled={loading} />
                        <Button type="button" value={t('page-register.value-button-login')} variant="button_cancel" onClick={() => navigate("/login")} disabled={loading} />
                    </ButtonGroup>
                )}
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register
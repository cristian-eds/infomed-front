import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

import logo from '../../assets/react.svg'

import styles from '../Login/Login.module.css'
import ButtonGroup from '../../components/Button/ButtonGroup';
import Button from '../../components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';


const Register = ({ register, loading }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

        const userData = {
            email,
            password
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
            <div className="img">
                <img src={logo} alt="Image Logo" />
            </div>
            <h2>Register</h2>
            <form className={styles.login} onSubmit={handleRegister}>
                <input type="text" name="email" id="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {error && <p className={styles.error}>{error}</p>}

                {!redirecting && (
                    <ButtonGroup>
                        <Button type="submit" value="Registrar" variant="button_confirm" disabled={loading} />
                        <Button type="button" value="Entrar" variant="button_cancel" onClick={() => navigate("/login")} disabled={loading} />
                    </ButtonGroup>
                )}
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register
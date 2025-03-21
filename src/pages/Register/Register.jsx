import React, { useState } from 'react'
import { useNavigate } from 'react-router';

import logo from '../../assets/react.svg'

import styles from '../Login/Login.module.css'
import ButtonGroup from '../../components/Button/ButtonGroup';
import Button from '../../components/Button/Button';


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError(null);

        if(password !== confirmPassword) {
            setError("Passwords don't match.")
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
                <input type="password" name="password" id="" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="confirmPassword" id="" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {error && <p className={styles.error}>{error}</p>  }
            
                <ButtonGroup>
                    <Button type="submit" value="Registrar" variant="button_confirm"/>
                    <Button type="button" value="Entrar" variant="button_cancel" onClick={() => navigate("/login")}/>
                </ButtonGroup>
            </form>
        </div>
    )
}

export default Register
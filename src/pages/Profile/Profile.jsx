import React, { useState } from 'react'

import styles from './Profile.module.css'
import Table from '../../components/Table/Table';

const Profile = () => {

    const email = "teste@teste.com.br";
    const [password, setPassword] = useState("312321");
    const [confirmPassword, setConfirmPassword] = useState("32132");

    return (
        <div className='container_main'>
            <header className={styles.header}>
                <h1>Ciclano da Silva</h1>
            </header>
            <section className={styles.container_profile}>
                <h3>Informações da conta</h3>
                <div className={styles.form_row}>
                    <label htmlFor="email">Email:</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="email" name="email" value={email} />
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="password">Password:</label>
                    <div className={styles.container_info_row}>
                        <input type="password" id="password" name="password" value={password}/>
                    </div>
                </div>
                <p>Alterar senha</p>
            </section>
            
            <section className={styles.container_profile}>
                <h3>Histórico</h3>
                <Table titles={["Ação","Descrição","Data"]}>
                    <tr>
                        <td>Delete</td>
                        <td>Deletado medicamento</td>
                        <td>08/04/2025</td>
                    </tr>
                    <tr>
                        <td>Delete</td>
                        <td>Deletado medicamento</td>
                        <td>08/04/2025</td>
                    </tr>
                </Table>
            </section>
        </div>
    )
}

export default Profile
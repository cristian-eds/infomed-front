import React from 'react'

import styles from './NotFound.module.css'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router'

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="container_main">
            <section className={styles.content_not_found}>
                <h2>Opss..</h2>
                <p>Não encontramos essa página</p>
                
                <footer>
                    <Button type={'button'} value={"Inicío"} variant={"button_confirm"} onClick={() => navigate("/")}/>
                </footer>
            </section>
        </div>
    )
}

export default NotFound
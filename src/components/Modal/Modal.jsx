import React from 'react'

import styles from './Modal.module.css'

const Modal = ({ showModal, setShowModal }) => {
    return (
        <>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <button onClick={() => setShowModal(false)}>Fechar</button>
                    </div>
                </div>


            )}
        </>
    )
}

export default Modal
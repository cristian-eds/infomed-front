import React, { useState } from 'react'

import styles from './ModalAddMedicine.module.css'

import Modal from './Modal'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import { createMedicine } from '../../slices/medicineSlice'
import { format } from 'date-fns'


const ModalAddMedicine = ({ showModal, setShowModal }) => {

    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState("");
    const [totalDays, setTotalDays] = useState("");
    const [initialDate, setInitialDate] = useState(format(new Date(),'yyyy-MM-dd hh:mm'));

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMedicine = {
            name,
            totalDays,
            frequencyHours: frequency,
            initialDateTime: initialDate
        }

        dispatch(createMedicine(newMedicine));
        setShowModal(false);
    }

    return (
        <>
            {showModal && (
                <Modal >
                    <div className={styles.modal_content}>
                        <header className={styles.modal_content_header}>
                            <ArrowLeftButton actionClick={() => setShowModal(false)} />
                            <h2 className={styles.modal_content_header_text}>Nova Medicação</h2>
                        </header>

                        <form className={styles.medication_form} onSubmit={handleSubmit}> 
                            <div className={styles.form_row}>
                                <label htmlFor="nome">Nome:</label>
                                <div className={styles.input_group}>
                                    <input type="text" id="nome" name="nome" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="frequencia">Frequência:</label>
                                <div className={styles.input_group}>
                                    <input type="number" id="frequencia" name="frequencia" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                                    <span className="unit">hrs</span>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="qtdDias">Qtd Dias:</label>
                                <div className={styles.input_group}>
                                    <input type="number" id="qtdDias" name="qtdDias" value={totalDays} onChange={(e) => setTotalDays(e.target.value)} />
                                    <span className="unit">dias</span>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="dataHoraInicial">Dia e hora inicial:</label>
                                <div className={styles.input_group}>
                                    <input type="datetime-local" id="dataHoraInicial" name="dataHoraInicial" value={initialDate} onChange={(e) => setInitialDate(e.target.value) }  />
                                </div>
                            </div>

                            <ButtonGroup>
                                <Button value="Cadastrar" type="submit" variant="button_confirm" />
                                <Button value="Cancelar" type="button" onClick={()=> setShowModal(false)} variant="button_cancel"/>
                            </ButtonGroup>
                        </form>
                    </div>
                </Modal>

            )}
        </>
    )
}

export default ModalAddMedicine
import React, { useState } from 'react'

import styles from './Modal.module.css'

import Modal from './Modal'
import ArrowLeftButton from '../Button/ArrowLeftButton'
import ButtonGroup from '../Button/ButtonGroup'
import Button from '../Button/Button'

import { format } from 'date-fns'
import { convertToPatternLocalDateTime } from '../../utils/formatterDates'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPerson } from '../../slices/personSlice'


const ModalAddMedicine = ({ showModal, setShowModal, actionToDispatch, dispatch }) => {

    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState("");
    const [totalDays, setTotalDays] = useState("");
    const [initialDate, setInitialDate] = useState(format(new Date(), 'yyyy-MM-dd hh:mm'));
    const [idPerson, setIdPerson] = useState("");

    const { personList } = useSelector(state => state.person);

    useEffect(() => {
        dispatch(fetchPerson())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMedicine = {
            name,
            totalDays,
            frequencyHours: frequency,
            initialDateTime: convertToPatternLocalDateTime(initialDate),
            idPerson
        }

        console.log(newMedicine);

        dispatch(actionToDispatch(newMedicine));
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
                                <label htmlFor="name">Nome:</label>
                                <div className={styles.input_group}>
                                    <input type="text" id="name" name="name" placeholder="Nome medicamento" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="frequence">Frequência:</label>
                                <div className={styles.input_group}>
                                    <input type="number" id="frequence" name="frequence" placeholder="Frequência" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                                    <span className="unit">hrs</span>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="qtdDias">Qtd Dias:</label>
                                <div className={styles.input_group}>
                                    <input type="number" id="qtdDias" name="qtdDias" placeholder="Quantidade dias" value={totalDays} onChange={(e) => setTotalDays(e.target.value)} />
                                    <span className="unit">dias</span>
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="dataHoraInicial">Dia e hora inicial:</label>
                                <div className={styles.input_group}>
                                    <input type="datetime-local" id="dataHoraInicial" name="dataHoraInicial" value={initialDate} onChange={(e) => setInitialDate(e.target.value)} />
                                </div>
                            </div>

                            <div className={styles.form_row}>
                                <label htmlFor="person">Pessoa vínculada:</label>
                                <div className={styles.input_group}>
                                    <select name="person" id="person" value={idPerson} onChange={(e) => setIdPerson(e.target.value)}>
                                        <option value="">Selecione</option>
                                        {personList.map(person => (
                                            <option key={person.id} value={person.id}>{person.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <ButtonGroup>
                                <Button value="Cadastrar" type="submit" variant="button_confirm" />
                                <Button value="Cancelar" type="button" onClick={() => setShowModal(false)} variant="button_cancel" />
                            </ButtonGroup>
                        </form>
                    </div>
                </Modal>

            )}
        </>
    )
}

export default ModalAddMedicine
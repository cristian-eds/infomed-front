import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router'

import { fetchDetailsPerson, fetchMedicinesForDetailsPerson, resetDetailsPerson } from '../../slices/personSlice';

import Table from '../../components/Table/Table';
import ArrowLeftButton from '../../components/Button/ArrowLeftButton';
import DeleteButton from '../../components/Button/DeleteButton';

import styles from './PersonDetails.module.css'

import { convertToPatternLocalDate, formatDate } from '../../utils/formatterDates';

const titles = [
    { name: "Nome", field: "name" },
    { name: "Data criação", field: "registrationDate" },
    { name: "Frequência", field: "frequencyHours" },
    { name: "Duração", field: "totalDays" },
    { name: "Concluído", field: "conclusion" },
    { name: "Próximo Medicamento", field: "nextMedicine" }
]

const PersonDetails = () => {

    const { id } = useParams("id");

    const { detailsPerson, medicinesForPersonDetails } = useSelector(state => state.person);

    console.log(medicinesForPersonDetails);

    const sort = {}
    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailsPerson(id));
        dispatch(fetchMedicinesForDetailsPerson(id));
        return () => {
            dispatch(resetDetailsPerson());
        }
    }, [dispatch, id])

    const handleSort = () => { }

    const generateItemsTable = () => {
        return medicinesForPersonDetails.map(
            medicine => (
                <tr key={medicine.id}>
                    <td>{medicine.name}</td>
                    <td>{formatDate(medicine.registrationDate)}</td>
                    <td>{medicine.frequence}/{medicine.frequence} horas</td>
                    <td>{medicine.totalDays} dias</td>
                    <td><input type="checkbox" name="conclusion" id="conclusion" checked={medicine.concluded} readOnly /></td>
                    <td>{medicine.nextItem && formatDate(medicine.nextItem.dayHour)}</td>
                </tr>
            )
        )
    }

    return (
        <div className="container_main">
            <header className={styles.header_details}>
                <Link to={"/person"}>
                    <ArrowLeftButton />
                </Link>
                <h2>
                    {detailsPerson.name}
                </h2>
                <DeleteButton />
            </header>
            <section className={styles.container_info}>
                <div className={styles.container_info_title}>
                    <h4>Informações da conta</h4>
                    {<p onClick={() => setEditing(true)}>{editing ? "Editando informações" : "Editar informações"}</p>}
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="name">Nome:</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="name" name="name" value={detailsPerson.name} />
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="phone">Telefone:</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="phone" name="phone" value={detailsPerson.phone} />
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="birth_date">Data Nascimento:</label>
                    <div className={styles.container_info_row}>
                        <input type="date" id="birth_date" name="birth_date" value={convertToPatternLocalDate(detailsPerson.birthDate)} />
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="accessCode">Código acesso:</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="namaccessCodee" name="accessCode" value={detailsPerson.accessCode} readOnly />
                    </div>
                </div>
            </section>
            <section>
                <h4>Lista de medicamentos...</h4>
                <Table titles={titles} sort={sort} handleSort={handleSort} >
                    {generateItemsTable()}
                </Table>
            </section>
        </div>
    )
}

export default PersonDetails
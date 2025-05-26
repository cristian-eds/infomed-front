import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router'
import { fetchDetailsPerson, resetDetailsPerson } from '../../slices/personSlice';
import ArrowLeftButton from '../../components/Button/ArrowLeftButton';
import DeleteButton from '../../components/Button/DeleteButton';

import styles from './PersonDetails.module.css'

import { convertToPatternLocalDate } from '../../utils/formatterDates';

const PersonDetails = () => {

    const { id } = useParams("id");

    const { detailsPerson } = useSelector(state => state.person);

    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailsPerson(id));

        return () => {
            dispatch(resetDetailsPerson());
        }
    }, [dispatch, id])

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
                        <input type="text" id="name" name="name" value={detailsPerson.name}/>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="phone">Telefone:</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="phone" name="phone" value={detailsPerson.phone}/>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="birth_date">Data Nascimento:</label>
                    <div className={styles.container_info_row}>
                        <input type="date" id="birth_date" name="birth_date" value={convertToPatternLocalDate(detailsPerson.birthDate)}/>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="accessCode">Código acesso:</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="namaccessCodee" name="accessCode" value={detailsPerson.accessCode} readOnly/>
                    </div>
                </div>
            </section>
            <section>
                <h4>Lista de medicamentos...</h4>
            </section>
        </div>
    )
}

export default PersonDetails
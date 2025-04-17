import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';

import { MdDelete, MdEdit } from "react-icons/md";

import { fetchMoreMedicinesUser, searchMedicinesUser } from '../../slices/medicineSlice';

import styles from './Medicines.module.css';
import { formatDate } from '../../utils/formatterDates';
import ArrowDownButton from '../../components/Button/ArrowDownButton';

const Medicines = () => {

    const dispatch = useDispatch();

    const [actualPage, setActualPage] = useState(0);
    const { loading, medicines, medicinePage } = useSelector(state => state.medicine);
    const [searchText, setSearchText] = useState("");

    const containerTableRef = useRef(null);

    useEffect(() => {
        const pagination = {
            actualPage: 0,
            sizePage: '6',
            search: searchText
        }
        dispatch(searchMedicinesUser(pagination))
    }, [dispatch])

    useEffect(() => {
        if (containerTableRef.current) containerTableRef.current.scrollTop = containerTableRef.current.scrollHeight;
    },[medicines])

    const handleFetchMoreMedicines = () => {
        setActualPage(actualPage + 1);
        const pagination = {
            actualPage: actualPage + 1,
            sizePage: '6'
        }
        dispatch(fetchMoreMedicinesUser(pagination))
    }

    const handleSearchMedicines = (e) => {
        e.preventDefault();
        const pagination = {
            actualPage: 0,
            sizePage: '6',
            search: searchText
        }
        dispatch(searchMedicinesUser(pagination))
    }

    const verifyConclusionMedicine = (medicine) => {
        return medicine && medicine.medicineItems.every(item => item.conclusion === true);
    }

    const generateRowsTableMedicine = (medicinesState) => {
        return medicinesState.map(medicine => (
            <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{formatDate(medicine.registrationDate)}</td>
                <td>{medicine.frequencyHours}/{medicine.frequencyHours} horas</td>
                <td>{medicine.totalDays} dias</td>
                <td><input type="checkbox" name="conclusion" id="conclusion" checked={verifyConclusionMedicine(medicine)} readOnly /></td>
                <td>
                    <MdEdit />
                    <MdDelete />
                </td>
            </tr>
        ))
    }

    return (
        <main className="container_main">
            <header className={styles.header_medicines}>
                <InputSearch handleSearch={handleSearchMedicines} searchText={searchText} setSearchText={setSearchText} loading={loading}/>
            </header>
            <div>
                {loading ? <p>Loading...</p> : <>
                    <h3>Histórico medicamentos...</h3>
                    <div className={styles.container_table} ref={containerTableRef}>
                        <Table titles={["Nome", "Data criação", "Frequência", "Duração", "Concluído", "Ações"]}>
                            {medicines && generateRowsTableMedicine(medicines)}
                        </Table>

                    </div>
                    <footer className={styles.footer_medicines}>
                        {medicinePage.totalPages - 1 === actualPage ?
                            <p>Todos elementos carregados...</p> :
                            <>
                                <p>Ver mais...</p>
                                <ArrowDownButton actionClick={handleFetchMoreMedicines} />
                            </>

                        }
                    </footer>
                </>}
            </div>
        </main>
    )
}

export default Medicines
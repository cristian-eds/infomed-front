import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import ArrowDownButton from '../../components/Button/ArrowDownButton';

import { MdDelete, MdEdit } from "react-icons/md";

import { fetchMoreMedicinesUser, searchMedicinesUser } from '../../slices/medicineSlice';

import { formatDate } from '../../utils/formatterDates';

import styles from './Medicines.module.css';
import ModalConfirmDeleteMedicine from '../../components/Modal/ModalConfirmDeleteMedicine';


const Medicines = () => {

    const dispatch = useDispatch();
    
    const { loading, medicines, medicinePage } = useSelector(state => state.medicine);

    const [actualPage, setActualPage] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [medicineToDelete, setMedicineToDelete] = useState(null);

    const [showModalDelete, setShowModalDelete] = useState(false);

    const containerTableRef = useRef(null);

    console.log(medicinePage);

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

    const handleDeleteMedicine = (medicine) => {
        setMedicineToDelete(medicine);
        setShowModalDelete(true);
    }

    const handleHiddenDeleteModal = () =>{
        setMedicineToDelete(null);
        setShowModalDelete(false);
    }

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
                    <MdEdit size={20}/>
                    <MdDelete size={20} onClick={() => handleDeleteMedicine(medicine)}/>
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
                        {medicinePage.totalPages - 1 === actualPage || medicinePage.totalElements === 0?
                            <p>Todos elementos carregados...</p> :
                            <>
                                <p>Ver mais...</p>
                                <ArrowDownButton actionClick={handleFetchMoreMedicines} />
                            </>

                        }
                    </footer>
                </>}
            </div>
            {showModalDelete && <ModalConfirmDeleteMedicine medicine={medicineToDelete} hiddenModal={handleHiddenDeleteModal} />}
        </main>
    )
}

export default Medicines
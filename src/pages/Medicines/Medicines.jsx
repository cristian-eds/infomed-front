import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import ArrowDownButton from '../../components/Button/ArrowDownButton';
import ModalConfirmDelete from '../../components/Modal/ModalConfirmDelete';
import ButtonPlus from '../../components/Button/ButtonPlus';
import ModalAddMedicine from '../../components/Modal/ModalAddMedicine';
import ModalEditMedicine from '../../components/Modal/ModalEditMedicine';

import { MdDelete, MdEdit } from "react-icons/md";

import { changeFieldSort, changeTypeSort, changeValueFieldFilter, createMedicine, deleteMedicine, fetchMoreMedicinesUser, searchMedicinesUser } from '../../slices/medicineSlice';

import { formatDate } from '../../utils/formatterDates';

import styles from './Medicines.module.css';

const titles = [
    { name: "Nome", field: "name" },
    { name: "Pessoa", field: "personName" },
    { name: "Data criação", field: "registrationDate" },
    { name: "Frequência", field: "frequencyHours" },
    { name: "Duração", field: "totalDays" },
    { name: "Concluído", field: "conclusion" },
    { name: "Ações", }
]

const Medicines = () => {

    const dispatch = useDispatch();

    const { loading, sort, medicines, filters, medicinePage, success } = useSelector(state => state.medicine);

    const [actualPage, setActualPage] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [medicineToDelete, setMedicineToDelete] = useState(null);
    const [medicineToEdit, setMedicineToEdit] = useState(null);

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalNewMedicine, setShowModalNewMedicine] = useState(false);
    const [showModalEditMedicine, setShowModalEditMedicine] = useState(false);

    const containerTableRef = useRef(null);

    useEffect(() => {
        dispatch(searchMedicinesUser(filters));
    }, [dispatch, filters])

    useEffect(() => {
        if (containerTableRef.current) containerTableRef.current.scrollTop = containerTableRef.current.scrollHeight;
    }, [medicines])

    const handleShowModalDelete = (medicine) => {
        setMedicineToDelete(medicine);
        setShowModalDelete(true);
    }

    const handleHiddenModalDelete = () => {
        setMedicineToDelete(null);
        setShowModalDelete(false);
    }

    const handleDeleteMedicine = () => {
        handleHiddenModalDelete();
        dispatch(deleteMedicine(medicineToDelete.id));
    }

    const handleShowModalEdit = (medicine) => {
        setMedicineToEdit(medicine);
        setShowModalEditMedicine(true);
    }

    const handleHiddenModalEdit = () => {
        setMedicineToEdit(null);
        setShowModalEditMedicine(false);
    }

    const handleFetchMoreMedicines = () => {
        setActualPage(actualPage + 1);
        const pagination = {
            actualPage: actualPage + 1,
            sizePage: 6
        }
        dispatch(fetchMoreMedicinesUser(pagination))
    }

    const handleSearchMedicines = (e) => {
        e.preventDefault();
        dispatch(changeValueFieldFilter({ field: "name", value: searchText }))
    }

    const handleSort = (field) => {
        if (field === sort.fieldSort) {
            dispatch(changeTypeSort());
        } else {
            dispatch(changeFieldSort(field));
        }
    }

    const verifyConclusionMedicine = (medicine) => {
        return medicine && medicine.medicineItems.every(item => item.conclusion === true);
    }

    const sortList = (medicinesState) => {
        let listOrdened = [...medicinesState];
        return listOrdened.sort(
            (a, b) => {
                let valueA = a[sort.fieldSort];
                let valueB = b[sort.fieldSort];

                if (sort.fieldSort === "personName") {
                    valueA = a.person.name;
                    valueB = b.person.name;
                }

                if (sort.fieldSort === "registrationDate") {
                    valueA = new Date(a.registrationDate).getTime();
                    valueB = new Date(b.registrationDate).getTime();
                }

                if (sort.fieldSort === "conclusion") {
                    valueA = verifyConclusionMedicine(a);
                    valueB = verifyConclusionMedicine(b);
                }

                if (sort.fieldSort === "name" || sort.fieldSort === "personName") {
                    if (sort.typeSort === "ASC") {
                        return valueA.localeCompare(valueB);
                    } else {
                        return valueB.localeCompare(valueA);
                    }
                }

                if (sort.typeSort === "ASC") return valueA - valueB;

                return valueB - valueA;
            }
        )
    }

    const generateRowsTableMedicine = (medicinesState) => {
        const listOrdened = sortList(medicinesState);
        return listOrdened.map(medicine => (
            <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.person?.name}</td>
                <td>{formatDate(medicine.registrationDate)}</td>
                <td>{medicine.frequencyHours}/{medicine.frequencyHours} horas</td>
                <td>{medicine.totalDays} dias</td>
                <td><input type="checkbox" name="conclusion" id="conclusion" checked={verifyConclusionMedicine(medicine)} readOnly /></td>
                <td>
                    <MdEdit size={20} onClick={() => handleShowModalEdit(medicine)} />
                    <MdDelete size={20} onClick={() => handleShowModalDelete(medicine)} />
                </td>
            </tr>
        ))
    }

    return (
        <main className="container_main">
            <ModalAddMedicine showModal={showModalNewMedicine} setShowModal={setShowModalNewMedicine} actionToDispatch={createMedicine} dispatch={dispatch} />

            <header className={styles.header_medicines}>
                <InputSearch handleSearch={handleSearchMedicines} searchText={searchText} setSearchText={setSearchText} loading={loading} />
            </header>
            <div>
                {loading ? <p>Loading...</p> : <>
                    <div className={styles.container_flex}>
                        <h3>Histórico medicamentos...</h3>
                        <ButtonPlus action={() => setShowModalNewMedicine(true)} />
                    </div>
                    <div className={styles.container_table} ref={containerTableRef}>
                        <Table titles={titles} sort={sort} handleSort={handleSort}>
                            {medicines && generateRowsTableMedicine(medicines)}
                        </Table>

                    </div>
                    <footer className={styles.footer_medicines}>
                        {medicinePage.totalPages - 1 === actualPage || medicinePage.totalElements === 0 ?
                            <p>Todos elementos carregados...</p> :
                            <>
                                <p>Ver mais...</p>
                                <ArrowDownButton actionClick={handleFetchMoreMedicines} />
                            </>

                        }
                    </footer>
                </>}
            </div>

            {showModalEditMedicine && 
                <ModalEditMedicine 
                    showModal={showModalEditMedicine} 
                    hiddenModal={handleHiddenModalEdit} 
                    medicine={medicineToEdit} 
                    dispatch={dispatch}
                    success={success}
                    />}

            {showModalDelete &&
                <ModalConfirmDelete
                    object={medicineToDelete}
                    handleDelete={handleDeleteMedicine}
                    text={"Confima a exclusão do medicamento?"}
                    handleHiddenModalDelete={handleHiddenModalDelete}
                />}
        </main>
    )
}

export default Medicines
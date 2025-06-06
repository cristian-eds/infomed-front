import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'

import InputSearch from '../../components/InputSearch/InputSearch'
import ButtonPlus from '../../components/Button/ButtonPlus'
import Table from '../../components/Table/Table'
import ModalAddPerson from '../../components/Modal/ModalAddPerson'
import ModalEditMedicineItem from '../../components/Modal/ModalEditMedicineItem'
import ArrowDownButton from '../../components/Button/ArrowDownButton'
import ModalConfirmDelete from '../../components/Modal/ModalConfirmDelete'

import { MdDelete, MdEdit } from 'react-icons/md'

import { changeFieldSort, changeTypeSort, deletePerson, fetchMorePerson, fetchPerson, incrementActualPage } from '../../slices/personSlice'

import { formatDate } from '../../utils/formatterDates'

import styles from './Person.module.css';

const titles = [
    { name: "Nome", field: "name" },
    { name: "Total medicamentos", field: "totalMedicines" },
    { name: "Medicamentos abertos", field: "pendingMedicines" },
    { name: "Próximo medicamento", field: "nextMedicine" },
    { name: "Ações" }
]

const Person = () => {

    const dispatch = useDispatch();

    const { personList, sort, loading, page } = useSelector(state => state.person);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showModalMedicineItem, setShowModalMedicineItem] = useState(false);
    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
    const [medicine, setMedicine] = useState(null);
    const [personToDelete, setPersonToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchPerson());
    }, [dispatch, sort, medicine])

    const generateItems = () => {
        const listSorted = sortList(personList);
        return listSorted.map((person) => (
            <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.totalMedicines}</td>
                <td>{person.pendingMedicines}</td>
                <td className='pointer' onClick={() => openModalNextMedicineItem(person)}>{person.nextMedicine && formatDate(person.nextMedicine.dayHour)}</td>
                <td>
                    <Link to={`/person/${person.id}`}>
                        <MdEdit size={20} />
                    </Link>
                    <MdDelete size={20} onClick={() => handleOpenModalDelete(person)} />
                </td>
            </tr>
        ))
    }

    const sortList = (listToSort) => {
        let copyList = [...listToSort];
        return copyList.sort(
            (a, b) => {
                let valueA = a[sort.fieldSort];
                let valueB = b[sort.fieldSort];

                if (sort.fieldSort === "nextMedicine") {
                    valueA = new Date(a.nextMedicine?.dayHour).getTime();
                    valueB = new Date(b.nextMedicine?.dayHour).getTime();

                    if (valueA === null || Number.isNaN(valueA)) {
                        return 1;
                    }
                    if (valueB === null || Number.isNaN(valueB)) {
                        return -1;
                    }
                }

                if (sort.fieldSort === "name") {
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

    const openModalNextMedicineItem = (person) => {
        if (person.nextMedicine !== null) {
            setMedicine(person.nextMedicine);
            setShowModalMedicineItem(true);
        }
    }

    const closeModalMedicine = () => {
        setTimeout(() => {
            setMedicine(null);
            setShowModalMedicineItem(false);
        }, 1000)
    }

    const handleFetchMoreMedicines = () => {
        dispatch(incrementActualPage());
        dispatch(fetchMorePerson());
    }

    const handleDelete = () => {
        dispatch(deletePerson(personToDelete.id));
        setShowModalConfirmDelete(false);
    }

    const handleOpenModalDelete = (person) => {
        setPersonToDelete(person);
        setShowModalConfirmDelete(true);
    }

    const handleHiddenModalDelete = () => {
        setShowModalConfirmDelete(false);
        setPersonToDelete(null);
    }

    const handleSort = (field) => {
        if (field === sort.fieldSort) {
            dispatch(changeTypeSort());
        } else {
            dispatch(changeFieldSort(field));
        }
    }

    return (
        <div className="container_main">
            {showAddModal && <ModalAddPerson setShowModal={setShowAddModal} dispatch={dispatch} />}
            <header className={styles.header}>
                <div></div>
                <div className={styles.header_input}>
                    <InputSearch />
                </div>
                <div style={{ justifySelf: 'end' }}>
                    <ButtonPlus action={() => setShowAddModal(true)} />
                </div>
            </header>
            <section>
                {loading ? <p>Carregando...</p> :
                    <Table titles={titles} sort={sort} handleSort={handleSort}>
                        {generateItems()}
                    </Table>
                }
            </section>

            <footer className={styles.footer_person}>
                {page.totalPages - 1 === page.number || page.totalElements === 0 ?
                    <p>Todos elementos carregados...</p> :
                    <>
                        <p>Ver mais...</p>
                        <ArrowDownButton actionClick={handleFetchMoreMedicines} />
                    </>

                }
            </footer>

            {showModalMedicineItem && <ModalEditMedicineItem
                dispatch={dispatch}
                medicine={medicine}
                showModal={showModalMedicineItem}
                setCloseModal={closeModalMedicine}
            />}

            {showModalConfirmDelete && <ModalConfirmDelete text={"Confirmar exclusão da pessoa: " + personToDelete.name + " ?"} object={personToDelete} handleDelete={handleDelete} handleHiddenModalDelete={handleHiddenModalDelete} />}

        </div>

    )
}

export default Person
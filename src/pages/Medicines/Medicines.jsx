import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import ModalConfirmDelete from '../../components/Modal/ModalConfirmDelete';
import ButtonPlus from '../../components/Button/ButtonPlus';
import ModalAddMedicine from '../../components/Modal/ModalAddMedicine';
import ModalEditMedicine from '../../components/Modal/ModalEditMedicine';
import SeeMoreFooter from '../../components/SeeMoreFooter/SeeMoreFooter';
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';

import { MdDelete, MdEdit } from "react-icons/md";

import { changeFieldSort, changeTypeSort, changeValueFieldFilter, createMedicine, deleteMedicine, fetchMoreMedicinesUser, searchMedicinesUser } from '../../slices/medicineSlice';

import { formatDate } from '../../utils/formatterDates';

import styles from './Medicines.module.css';
import { AuthContext } from '../../context/AuthContext';

const Medicines = () => {

    const dispatch = useDispatch();

    const {t} = useTranslation();
    const {role} = useContext(AuthContext);

    const titles = [
        { name: t("title-tables.text-name"), field: "name" },
        { name: t("title-tables.text-person"), field: "personName" },
        { name: t("title-tables.text-registration-date"), field: "registrationDate" },
        { name: t("title-tables.text-frequence"), field: "frequencyHours" },
        { name: t("title-tables.text-duration"), field: "totalDays" },
        { name: t("title-tables.text-completed"), field: "conclusion" },
        { name: t("title-tables.text-actions"), }
    ]

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

    const handleDuplicateMedicine = (medicine) => {
        setShowModalNewMedicine(true);
        setMedicineToEdit(medicine);
    }

    const handleCloseModalNewMedicine = () => {
        setShowModalNewMedicine(false);
        setMedicineToEdit(null);
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
                <td><CustomCheckBox checked={verifyConclusionMedicine(medicine)} /></td>
                <td>
                    <MdEdit size={20} onClick={() => handleShowModalEdit(medicine)} />
                    {role !== "GUEST" && <MdDelete size={20} onClick={() => handleShowModalDelete(medicine)} />}
                </td>
            </tr>
        ))
    }

    return (
        <main className="container_main">
            <header className={styles.header_medicines}>
                <InputSearch handleSearch={handleSearchMedicines} searchText={searchText} setSearchText={setSearchText} loading={loading} />
            </header>
            <div className={styles.medicines}>
                {loading ? <p>Loading...</p> : <>
                    <div className={styles.container_flex}>
                        <h3>{t('page-medicines.text-history-medicines')}</h3>
                        {role !== "GUEST" && <ButtonPlus action={() => setShowModalNewMedicine(true)} />}
                    </div>
                    <div className={styles.container_table} ref={containerTableRef}>
                        <Table titles={titles} sort={sort} handleSort={handleSort}>
                            {medicines && generateRowsTableMedicine(medicines)}
                        </Table>

                    </div>
                    <SeeMoreFooter condition={medicinePage.totalPages - 1 === actualPage || medicinePage.totalElements === 0} handleFetchMore={handleFetchMoreMedicines} />
                </>}
            </div>

            {showModalNewMedicine && <ModalAddMedicine
                showModal={showModalNewMedicine}
                setShowModal={setShowModalNewMedicine}
                actionToDispatch={createMedicine}
                dispatch={dispatch}
                handleCloseModal={handleCloseModalNewMedicine}
                medicineDuplicate={medicineToEdit}
            />}

            {showModalEditMedicine &&
                <ModalEditMedicine
                    showModal={showModalEditMedicine}
                    hiddenModal={handleHiddenModalEdit}
                    medicine={medicineToEdit}
                    dispatch={dispatch}
                    success={success}
                    handleDuplicateMedicine={handleDuplicateMedicine}

                />}

            {showModalDelete &&
                <ModalConfirmDelete
                    object={medicineToDelete}
                    handleDelete={handleDeleteMedicine}
                    text={t('modals.question-confirm-delete-medicine')}
                    handleHiddenModalDelete={handleHiddenModalDelete}
                />}
        </main>
    )
}

export default Medicines
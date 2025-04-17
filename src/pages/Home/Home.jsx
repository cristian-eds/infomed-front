import React, { useEffect, useState } from 'react'

import styles from './Home.module.css'

import { FaPlus } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { differenceInMinutes, isAfter } from 'date-fns';

import { searchCustomMedicinesItemUser } from '../../slices/medicineSlice';

import RowTableMedicineItem from '../../components/RowTableMedicineItem/RowTableMedicineItem';
import ModalEditMedicineItem from '../../components/Modal/ModalEditMedicineItem';
import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import ModalAddMedicine from '../../components/Modal/ModalAddMedicine';
import FilterHome from '../../components/FilterHome/FilterHome';

const Home = () => {

  const dispatch = useDispatch();

  const { loading, medicinesItems, page } = useSelector(state => state.medicine);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalEditMedicineItem, setShowModalEditMedicineItem] = useState(false);
  const [medicineEditing, setMedicineEditing] = useState();
  const [actualPage, setActualPage] = useState(0);
  const sizePage = 6;

  const date = new Date();

  useEffect(() => {
    const pagination = {
      actualPage,
      sizePage,
      name: search
    }
    if(filters) {
      pagination.initialDate = filters.initialDate;
      pagination.finalDate = filters.finalDate;
      pagination.status = filters.status;
    }
    
    dispatch(searchCustomMedicinesItemUser(pagination));
  }, [dispatch, actualPage, sizePage,filters]);

  const handleSearch = (e, filtersParam) => {
    e && e.preventDefault();
    const pagination = generateDataAndPaginationToSearch(filtersParam);

    if(filtersParam) {
      setFilters(filtersParam);
    } else {
      setFilters(null);
    }

    dispatch(searchCustomMedicinesItemUser(pagination));
  }

  const generateDataAndPaginationToSearch = (filtersParam) => {
    const pagination = {
      actualPage,
      sizePage,
      name: search
    }
    if(filtersParam) {
      pagination.initialDate = filtersParam.initialDate;
      pagination.finalDate = filtersParam.finalDate;
      pagination.status = filtersParam.status;
    }
    return pagination;
  }

  const verifyTimeToNextMedicine = (medicines) => {
    if (medicines.length === 0) return "Não há nenhum próximo medicamento...";
    const listItens = generateObjectsItensSortedByDate(medicines);
    const listItensAfter = listItens.filter((item) =>
      isAfter(item.dayHour, date)
    );
    if (listItensAfter.length === 0) return `Sem próximo medicamento definido com os filtros e pesquisa.`;
    const minutesDiff = differenceInMinutes(listItensAfter[0].dayHour, date);
    if (minutesDiff <= 60) {
      return `Próximo medicamento em ${minutesDiff} minutos`;
    } else if (minutesDiff > 60) {
      return `Próximo medicamento em ${calculateTimeForNext(minutesDiff)}`;
    }

    return "Não há nenhum próximo medicamento...";
  }

  const calculateTimeForNext = (time) => {
    const divisor = time / 60;
    const hours = Math.floor(divisor);
    const minutes = (divisor - hours) * 60;

    return `${hours} horas e ${minutes.toFixed(0)} minutos`;
  }

  const generateObjectsItensSortedByDate = (medicinesState) => {
    const listObjects = [...medicinesState];

    return listObjects.sort((a, b) => new Date(a.dayHour).getTime() - new Date(b.dayHour).getTime());
  }

  const fillRowTable = (medicinesState) => {
    const listItens = generateObjectsItensSortedByDate(medicinesState);
    return listItens.map((medicine) => (
      <RowTableMedicineItem medicine={medicine} key={medicine.medicineItemId} setShowMedicineEditing={handleSetShowModalMedicineEditing} />
    ));
  }

  const handleSetShowModalMedicineEditing = (medicine) => {
    setMedicineEditing(medicine);
    setShowModalEditMedicineItem(true);
  }

  const handleCloseModalMedicineEditing = () => {
    setMedicineEditing(null);
    setShowModalEditMedicineItem(false);
  }

  return (
    <>
      <ModalAddMedicine showModal={showModal} setShowModal={setShowModal} />
      {medicineEditing && <ModalEditMedicineItem showModal={showModalEditMedicineItem} setCloseModal={handleCloseModalMedicineEditing} medicine={medicineEditing} />}

      <main className="container_main">
        <header className={styles.header}>
          <div>
            <h2>Hoje: {date && date.toLocaleDateString()}</h2>
            <p>{verifyTimeToNextMedicine(medicinesItems)}</p>
          </div>
          <InputSearch searchText={search} setSearchText={setSearch} loading={loading} handleSearch={handleSearch} />
        </header>
        {loading ? <p>Loading...</p> : <>
          <div className={styles.container_caption}>
            <FilterHome handleSearch={handleSearch} filters={filters}/>
            <button onClick={() => setShowModal(true)}><FaPlus /></button>
          </div>
          <div className={styles.container_table}>
            <Table titles={["Nome", "Número", "Frequência", "Horário", "Concluído", "Ações"]}>
              {medicinesItems.length > 0 && fillRowTable(medicinesItems)}
            </Table>
          </div>
          <Pagination page={page} actualPage={actualPage} setActualPage={setActualPage} />
        </>}
      </main>
    </>
  )
}

export default Home
import React, { useEffect, useState } from 'react'

import styles from './Home.module.css'

import { FaPlus } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';

import RowTableMedicineItem from '../../components/RowTableMedicineItem/RowTableMedicineItem';
import ModalEditMedicineItem from '../../components/Modal/ModalEditMedicineItem';
import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import ModalAddMedicine from '../../components/Modal/ModalAddMedicine';
import FilterHome from '../../components/FilterHome/FilterHome';
import NextMedicine from '../../components/NextMedicine/NextMedicine';

import { searchCustomMedicinesItemUser } from '../../slices/medicineItemSlice';

const titles = [
  {name: "Nome", field: "NAME"}, 
  {name: "Número", field: "NUMBER"}, 
  {name: "Frequência",field: "FREQUENCE"}, 
  {name:"Horário",field: "DAY_HOUR"}, 
  {name:"Concluído",field: "CONCLUSION"}, 
  {name:"Ações",}];

const Home = () => {

  const dispatch = useDispatch();

  const { loading, medicinesItems, page, sort } = useSelector(state => state.medicineItem);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalEditMedicineItem, setShowModalEditMedicineItem] = useState(false);
  const [medicineEditing, setMedicineEditing] = useState();
  const [actualPage, setActualPage] = useState(0);
  const sizePage = 6;

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
  }, [dispatch, actualPage, sizePage,filters, sort]);

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
    setActualPage(0);
    const pagination = {
      actualPage : 0,
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

  const fillRowTable = (medicinesState) => {
    const listItens = medicinesState.slice(0, sizePage);
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
      <ModalAddMedicine showModal={showModal} setShowModal={setShowModal} dispatch={dispatch}/>
      {medicineEditing && <ModalEditMedicineItem showModal={showModalEditMedicineItem} setCloseModal={handleCloseModalMedicineEditing} medicine={medicineEditing} />}

      <main className="container_main">
        <header className={styles.header}>
          <NextMedicine medicinesItems={medicinesItems} />
          <InputSearch searchText={search} setSearchText={setSearch} loading={loading} handleSearch={handleSearch} />
        </header>
        {loading ? <p>Loading...</p> : <>
          <div className={styles.container_caption}>
            <FilterHome handleSearch={handleSearch} filters={filters}/>
            <button onClick={() => setShowModal(true)}><FaPlus /></button>
          </div>
          <div className={styles.container_table}>
            <Table titles={titles} dispatch={dispatch}>
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
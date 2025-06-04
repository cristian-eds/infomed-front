import React, { useEffect, useState } from 'react'

import styles from './Home.module.css'


import { useDispatch, useSelector } from 'react-redux';

import RowTableMedicineItem from '../../components/RowTableMedicineItem/RowTableMedicineItem';
import ModalEditMedicineItem from '../../components/Modal/ModalEditMedicineItem';
import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import ModalAddMedicine from '../../components/Modal/ModalAddMedicine';
import FilterHome from '../../components/FilterHome/FilterHome';
import NextMedicine from '../../components/NextMedicine/NextMedicine';
import ButtonPlus from '../../components/Button/ButtonPlus';

import { changeFieldSort, changeTypeSort, changeValueFieldFilter, changeValuesFilter, createMedicine, searchCustomMedicinesItemUser } from '../../slices/medicineItemSlice';

const titles = [
  { name: "Nome", field: "NAME" },
  { name: "Pessoa", field: "PERSON" },
  { name: "N°", field: "NUMBER" },
  { name: "Frequência", field: "FREQUENCE" },
  { name: "Horário", field: "DAY_HOUR" },
  { name: "Concluído", field: "CONCLUSION" },
  { name: "Ações", }];

const Home = () => {

  const dispatch = useDispatch();

  const { loading, medicinesItems, page, sort, filters } = useSelector(state => state.medicineItem);

  const [search, setSearch] = useState(filters.name);

  const [showModal, setShowModal] = useState(false);
  const [showModalEditMedicineItem, setShowModalEditMedicineItem] = useState(false);
  const [medicineEditing, setMedicineEditing] = useState();

  const sizePage = 6;

  useEffect(() => {
    dispatch(searchCustomMedicinesItemUser(filters));
    return () => { }
  }, [dispatch, filters, sort]);

  const handleSearch = (e, filtersParam) => {
    e && e.preventDefault();
    if (filtersParam) {
      dispatch(changeValuesFilter(filtersParam));
      return;
    }

    const filterName = {
      field: "name",
      value: search
    }
    dispatch(changeValueFieldFilter(filterName))

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

  const handleSort = (field) => {
    if (field === sort.fieldSort) {
      dispatch(changeTypeSort());
    } else {
      dispatch(changeFieldSort(field));
    }
  }

  return (
    <>
      <ModalAddMedicine showModal={showModal} setShowModal={setShowModal} actionToDispatch={createMedicine} dispatch={dispatch} />
      {medicineEditing && <ModalEditMedicineItem showModal={showModalEditMedicineItem} setCloseModal={handleCloseModalMedicineEditing} medicine={medicineEditing} dispatch={dispatch} />}

      <main className="container_main">
        <header className={styles.header}>
          <NextMedicine medicinesItems={medicinesItems} />
          <div className={styles.header_input}>
            <InputSearch searchText={search} setSearchText={setSearch} loading={loading} handleSearch={handleSearch} />
          </div>
        </header>
        {loading ? <p>Loading...</p> : <>
          <div className={styles.container_caption}>
            <FilterHome handleSearch={handleSearch} filters={filters} />
            <ButtonPlus action={() => setShowModal(true)} />
          </div>
          <div className={styles.container_table}>
            <Table titles={titles} dispatch={dispatch} sort={sort} handleSort={handleSort}>
              {medicinesItems.length > 0 && fillRowTable(medicinesItems)}
            </Table>
          </div>
          <Pagination page={page} />
        </>}
      </main>
    </>
  )
}

export default Home
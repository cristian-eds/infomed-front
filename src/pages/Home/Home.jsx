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
import { useTranslation } from 'react-i18next';

const Home = () => {

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const titles = [
    { name: t('title-tables.text-name'), field: "NAME" },
    { name: t('title-tables.text-person'), field: "PERSON" },
    { name: t('title-tables.text-number'), field: "NUMBER" },
    { name: t('title-tables.text-frequence'), field: "FREQUENCE" },
    { name: t('title-tables.text-schedule'), field: "DAY_HOUR" },
    { name: t('title-tables.text-completed'), field: "CONCLUSION" },
    { name: t('title-tables.text-actions'), }];

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
        <ModalAddMedicine showModal={showModal} handleCloseModal={() => setShowModal(false)} actionToDispatch={createMedicine} dispatch={dispatch} />
        {medicineEditing && <ModalEditMedicineItem showModal={showModalEditMedicineItem} setCloseModal={handleCloseModalMedicineEditing} medicine={medicineEditing} dispatch={dispatch} />}

      </main>
    </>
  )
}

export default Home
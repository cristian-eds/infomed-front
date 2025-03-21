import React, { Fragment, useEffect, useState } from 'react'

import styles from './Home.module.css'

import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import Pagination from '../../components/Pagination/Pagination';
import Navbar from '../../components/Navbar/Navbar'
import ModalAddMedicine from '../../components/Modal/ModalAddMedicine';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicinesUser, searchMedicinesUser } from '../../slices/medicineSlice';
import { differenceInMinutes, format, isAfter } from 'date-fns';

const Home = ({ logout }) => {

  const dispatch = useDispatch();

  const { loading, medicines } = useSelector(state => state.medicine);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const date = new Date();

  useEffect(() => {
    dispatch(fetchMedicinesUser());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchMedicinesUser(search));
  }

  const formatDate = (date) => {
    return format(date, 'dd/MM/yyyy HH:mm')
  }

  const verifyTimeToNextMedicine = (medicines) => {
    if(medicines.length === 0) return;
    const listItens = generateObjectsItensSortedByDate(medicines);
    const listItensAfter = listItens.filter((item) =>
      isAfter(item.dayHour, date)
    );
    console.log(listItensAfter);
    const minutesDiff = differenceInMinutes(listItensAfter[0].dayHour, date);
    console.log(minutesDiff);
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

const generateObjectsItensSortedByDate = (medicines) => {
  const listObjects = [];
  medicines.forEach((medicine) => {
    medicine.medicineItems.forEach(medicineItem => {
      const item = {
        medicineId: medicine.id,
        medicineItemId: medicineItem.id,
        name: medicine.name,
        sequency: medicineItem.medicineItemSequence,
        total: medicine.medicineItems.length,
        frequency: medicine.frequencyHours,
        dayHour: medicineItem.dayHour,
        conclusion: medicineItem.conclusion
      }
      listObjects.push(item);
    });
  })
  return listObjects.sort((a, b) => new Date(a.dayHour).getTime() - new Date(b.dayHour).getTime());
}

const fillRowTable = (medicines) => {
  const listItens = generateObjectsItensSortedByDate(medicines);
  return listItens.map((medicine) => (
    <tr key={medicine.medicineItemId}>
      <td>{medicine.name}</td>
      <td>{medicine.sequency}/{medicine.total}</td>
      <td>{medicine.frequency}/{medicine.frequency} hours</td>
      <td>{formatDate(medicine.dayHour)}</td>
      <td><input type="checkbox" name="" id="" /></td>
      <td>Editar</td>
    </tr>
  ));
}

return (
  <>
    <ModalAddMedicine showModal={showModal} setShowModal={setShowModal} />
    <Navbar logout={logout} />
    <main className={styles.container_main}>
      <header className={styles.header}>
        <div>
          <h2>Hoje: {date && date.toLocaleDateString()}</h2>
          <p>{verifyTimeToNextMedicine(medicines)}</p>
        </div>
        <form className={styles.search_input} onSubmit={handleSearch}>
          <input type="text" placeholder='Pesquisar...' name='search' value={search} onChange={(e) => setSearch(e.target.value)} disabled={loading} />
          <button type="submit" disabled={loading}>
            <FaSearch className={styles.search_input__icon} />
          </button>
        </form>
      </header>
      {loading ? <p>Loading...</p> : <>
        <div className={styles.container_caption}>
          <button onClick={() => setShowModal(true)}><FaPlus /></button>
        </div>
        <div className={styles.container_table}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Número</th>
                <th>Frequência</th>
                <th>Horário</th>
                <th>Concluído</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {medicines && fillRowTable(medicines)}
            </tbody>
          </table>
        </div>
        <Pagination />
      </>}
    </main>
  </>
)
}

export default Home
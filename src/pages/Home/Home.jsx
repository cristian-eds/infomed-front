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

  console.log("Recarregou")

  const dispatch = useDispatch();

  const { error, loading, medicines } = useSelector(state => state.medicine);

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

  const verifyTimeToNextMedicine = () => {
    if(medicines) {
      const datesAfter = [];
      medicines.forEach(medicine => {
        medicine.medicineItems.forEach(item => {
          if(isAfter(item.dayHour,date)){
            datesAfter.push(item.dayHour);
          }
      })});
    
      const minutesDiff =  differenceInMinutes(datesAfter[0],date);
      if(minutesDiff <= 60) {
        return `Próximo medicamento em ${minutesDiff} minutos`;
      } else if(medicines > 60){
        return `Próximo medicamento em ${calculateHoursForNext(minutesDiff)}`;
      }

    }
    return "Não há nenhum próximo medicamento...";
}

const calculateHoursForNext = (time) => {
    const divisor = time / 60;
    const hours = Math.floor(divisor);
    const minutes = (divisor - hours) * 60;

    return `${hours} horas e ${minutes.toFixed(0)} minutos`;
}

  const fillRowTable = (medicine) => {
    return medicine.map((item) => (
      <Fragment key={item.id}>
        {item.medicineItems.map((medicineItem) => (
          <tr key={medicineItem.id}>
            <td>{item.name}</td>
            <td>{medicineItem.medicineItemSequence}/{item.medicineItems.length}</td>
            <td>{item.frequencyHours}/{item.frequencyHours} hours</td>
            <td>{formatDate(medicineItem.dayHour)}</td>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Editar</td>
          </tr>
        ))}
      </Fragment>
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
            <p>{verifyTimeToNextMedicine()}</p>
          </div>
          <form className={styles.search_input} onSubmit={handleSearch}>
            <input type="text" placeholder='Pesquisar...' name='search' value={search} onChange={(e) => setSearch(e.target.value)} disabled={loading}/>
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
        </> }
      </main>
    </>
  )
}

export default Home
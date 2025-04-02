import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import InputSearch from '../../components/InputSearch/InputSearch';
import Table from '../../components/Table/Table';

import { MdDelete, MdEdit } from "react-icons/md";

import { fetchMedicinesUser } from '../../slices/medicineSlice';

import styles from './Medicines.module.css';
import { formatDate } from '../../utils/formatterDates';

const Medicines = () => {

    const dispatch = useDispatch();

    const { loading, medicines } = useSelector(state => state.medicine);

    useEffect(() => {
        const pagination = {
            actualPage : '0',
            sizePage : '6'
          }
        dispatch(fetchMedicinesUser(pagination))
    }, [dispatch])

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
                <td><input type="checkbox" name="conclusion" id="conclusion" checked={verifyConclusionMedicine(medicine)} readOnly/></td>
                <td>
                    <MdEdit />
                    <MdDelete />
                </td>
            </tr>
        ))
    }

    if(loading) return <p>Loading...</p>;

    return (
      
      <main className="container_main">
            <header className={styles.header_medicines}>
                <InputSearch />
            </header>
            <div>
                <h3>Histórico medicamentos...</h3>
                <Table titles={["Nome", "Data criação", "Frequência", "Duração", "Concluído", "Ações"]}>
                    {medicines && generateRowsTableMedicine(medicines)}
                </Table>
            </div>
        </main>
    )
}

export default Medicines
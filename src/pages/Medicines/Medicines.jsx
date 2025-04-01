import React from 'react'

import InputSearch from '../../components/InputSearch/InputSearch';

import { MdDelete, MdEdit } from "react-icons/md";

import styles from './Medicines.module.css';
import Table from '../../components/Table/Table';

const Medicines = () => {
    return (
        <main className="container_main">
            <header className={styles.header_medicines}>
                <InputSearch />
            </header>
            <div>
                <h3>Histórico medicamentos...</h3>
                <Table titles={["Nome", "Data criação", "Frequência","Duração", "Concluído", "Ações"]}>
                    <tr>
                        <td>Ibuprofeno</td>
                        <td>01/02/2025 18:00</td>
                        <td>3-3horas</td>
                        <td>5 dias</td>
                        <td>X</td>
                        <td>
                            <MdEdit />
                            <MdDelete />
                        </td>
                    </tr>
                </Table>
            </div>
        </main>
    )
}

export default Medicines
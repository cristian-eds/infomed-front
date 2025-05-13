import React from 'react'

import InputSearch from '../../components/InputSearch/InputSearch'
import ButtonPlus from '../../components/Button/ButtonPlus'
import Table from '../../components/Table/Table'

import { MdDelete, MdEdit } from 'react-icons/md'

import styles from './Person.module.css';

const titles = [
    { name: "Nome", field: "name" },
    { name: "Total medicamentos", field: "totalMedicines" },
    { name: "Medicamentos abertos", field: "pendingMedicines" },
    { name: "Próximo medicamento", field: "nextMedicine" },
    { name: "Açoes" }
]

const Person = () => {

    const sort = {
        fieldSort: "name",
        typeSort: "ASC"
    }

    const generateItems = () => {
        return (
            <tr>
                <td>Fulano</td>
                <td>4</td>
                <td>2</td>
                <td>13/05/2025</td>
                <td>
                    <MdEdit size={20} />
                    <MdDelete size={20} />
                </td>
            </tr>
        )
    }

    return (
        <div className="container_main">
            <header className={styles.header}>
                <div></div>
                <InputSearch />
                <div style={{justifySelf: 'end'}}>
                    <ButtonPlus />
                </div>
            </header>
            <section>
                <Table titles={titles} sort={sort} >
                    {generateItems()}
                </Table>
            </section>
        </div>
    )
}

export default Person
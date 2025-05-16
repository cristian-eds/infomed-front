import React, { useEffect, useState } from 'react'

import InputSearch from '../../components/InputSearch/InputSearch'
import ButtonPlus from '../../components/Button/ButtonPlus'
import Table from '../../components/Table/Table'

import { MdDelete, MdEdit } from 'react-icons/md'

import styles from './Person.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPerson } from '../../slices/personSlice'
import ModalAddPerson from '../../components/Modal/ModalAddPerson'

const titles = [
    { name: "Nome", field: "name" },
    { name: "Total medicamentos", field: "totalMedicines" },
    { name: "Medicamentos abertos", field: "pendingMedicines" },
    { name: "Próximo medicamento", field: "nextMedicine" },
    { name: "Ações" }
]

const Person = () => {

    const dispatch = useDispatch();

    const { personList, sort, loading} = useSelector(state => state.person); 

    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        dispatch(fetchPerson());
    }, [dispatch, sort])


    const generateItems = () => {
        return personList.map((person) => (
            <tr key={person.id}>
                <td>{person.name}</td>
                <td>4</td>
                <td>2</td>
                <td>13/05/2025</td>
                <td>
                    <MdEdit size={20} />
                    <MdDelete size={20} />
                </td>
            </tr>
        ) )
    }

    if(loading) return <p>Carregando...</p>

    return (
        <div className="container_main">
            {showAddModal && <ModalAddPerson setShowModal={setShowAddModal} dispatch={dispatch}/>}
            <header className={styles.header}>
                <div></div>
                <InputSearch />
                <div style={{justifySelf: 'end'}}>
                    <ButtonPlus action={() => setShowAddModal(true)}/>
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
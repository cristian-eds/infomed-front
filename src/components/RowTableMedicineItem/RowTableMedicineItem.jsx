import React from 'react';

import { format } from 'date-fns';

import styles from './RowTableMedicineItem.module.css';

const RowTableMedicineItem = ({ medicine, setShowMedicineEditing }) => {

    const formatDate = (date) => {
        return format(date, 'dd/MM/yyyy HH:mm')
    }

    return (<>
        <tr >
            <td>{medicine.name}</td>
            <td>{medicine.sequency}/{medicine.total}</td>
            <td>{medicine.frequency}/{medicine.frequency} hours</td>
            <td>{formatDate(medicine.dayHour)}</td>
            <td><input type="checkbox" name="" id="" /></td>
            <td onClick={() => setShowMedicineEditing(medicine)} className={styles.row_edit}>Editar</td>
        </tr>

    </>
    )
}

export default RowTableMedicineItem
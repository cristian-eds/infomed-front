import React, { useState } from 'react';

import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import { alterStatusMedicineItem } from '../../slices/medicineSlice';

import styles from './RowTableMedicineItem.module.css';

const RowTableMedicineItem = ({ medicine, setShowMedicineEditing }) => {

    const dispatch = useDispatch();

    const [checked,setChecked] = useState(medicine.conclusion);
    
    const handleAlterConclusionItem = (e) => {
        setChecked(e.target.checked);
        dispatch(alterStatusMedicineItem(medicine.medicineItemId));
    }

    const formatDate = (date) => {
        return format(date, 'dd/MM/yyyy HH:mm')
    }

    return (<>
        <tr >
            <td>{medicine.name}</td>
            <td>{medicine.sequency}/{medicine.total}</td>
            <td>{medicine.frequency}/{medicine.frequency} horas</td>
            <td>{formatDate(medicine.dayHour)}</td>
            <td><input type="checkbox" name="conclusion" id="conclusion" checked={checked} onChange={handleAlterConclusionItem}/></td>
            <td onClick={() => setShowMedicineEditing(medicine)} className={styles.row_edit}>Editar</td>
        </tr>

    </>
    )
}

export default RowTableMedicineItem
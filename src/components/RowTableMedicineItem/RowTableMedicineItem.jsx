import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { alterStatusMedicineItem } from '../../slices/medicineItemSlice';

import styles from './RowTableMedicineItem.module.css';
import { formatDate } from '../../utils/formatterDates';
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';

const RowTableMedicineItem = ({ medicine, setShowMedicineEditing }) => {

    const dispatch = useDispatch();

    const [checked,setChecked] = useState(medicine.conclusion);
    
    const handleAlterConclusionItem = (e) => {
        setChecked(e.target.checked);
        dispatch(alterStatusMedicineItem(medicine.medicineItemId));
    }

    return (<>
        <tr >
            <td>{medicine.name}</td>
            <td>{medicine.personName}</td>
            <td>{medicine.sequency}/{medicine.total}</td>
            <td>{medicine.frequency}/{medicine.frequency} horas</td>
            <td>{formatDate(medicine.dayHour)}</td>
            <td><CustomCheckBox checked={checked} handleCheck={handleAlterConclusionItem}/></td>
            <td onClick={() => setShowMedicineEditing(medicine)} className={styles.row_edit}>Editar</td>
        </tr>

    </>
    )
}

export default RowTableMedicineItem
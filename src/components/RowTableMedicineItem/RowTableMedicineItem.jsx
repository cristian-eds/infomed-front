import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { alterStatusMedicineItem } from '../../slices/medicineItemSlice';

import styles from './RowTableMedicineItem.module.css';

import { formatDate } from '../../utils/formatterDates';

import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';


import { MdEdit } from "react-icons/md";

const RowTableMedicineItem = ({ medicine, setShowMedicineEditing }) => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

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
            <td>{medicine.frequency}/{medicine.frequency} {t('row-table-medicine-item.text-hours')}</td>
            <td>{formatDate(medicine.dayHour)}</td>
            <td><CustomCheckBox checked={checked} handleCheck={handleAlterConclusionItem}/></td>
            <td onClick={() => setShowMedicineEditing(medicine)} className={styles.row_edit}><MdEdit size={20}/> </td>
        </tr>

    </>
    )
}

export default RowTableMedicineItem
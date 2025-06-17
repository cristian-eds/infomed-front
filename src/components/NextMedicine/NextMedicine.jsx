import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getNextMedicineItem } from '../../slices/medicineItemSlice';
import { differenceInMinutes } from 'date-fns';

import ModalEditMedicineItem from '../Modal/ModalEditMedicineItem';

import styles from './NextMedicine.module.css'
import { useTranslation } from 'react-i18next';

const NextMedicine = ({ medicinesItems }) => {

    const dispatch = useDispatch();
      const { t } = useTranslation();

    const date = new Date();
    const [showModalEditItem, setShowModalEditItem] = useState(false);

    const { nextMedicineItem } = useSelector(state => state.medicineItem);

    useEffect(() => {
        dispatch(getNextMedicineItem());
    }, [dispatch, medicinesItems])

    const verifyTimeToNextMedicine = (medicine) => {
        let textToShow = "";
        const laterDate = new Date(medicine.dayHour);
        const minutesDiff = differenceInMinutes(laterDate, date);
        if (minutesDiff <= 60) {
            textToShow = t('next-medicine.text-next-in-minutes', {name: nextMedicineItem.name, minutesDiff: minutesDiff});
        } else if (minutesDiff > 60) {
            textToShow = t('next-medicine.text-next-in-hours-minutes',{name: nextMedicineItem.name, timeToNext: calculateTimeForNext(minutesDiff)});
        }
        return textToShow;
    }

    const calculateTimeForNext = (time) => {
        const divisor = time / 60;
        const hours = Math.floor(divisor);
        const minutes = (divisor - hours) * 60;

        return t('next-medicine.text-hours-minutes',{hours, minutes: minutes.toFixed(0)});
    }


    return (
        <div>
            {nextMedicineItem && <ModalEditMedicineItem dispatch={dispatch} medicine={nextMedicineItem} showModal={showModalEditItem} setCloseModal={()=> setShowModalEditItem(false)}/>}
            <h2 className={styles.title_text}>{t('next-medicine.text-today')} {date && date.toLocaleDateString()}</h2>
            {Object.keys(nextMedicineItem).length > 0 ?
                <div onClick={() => setShowModalEditItem(true)} style={{cursor: 'pointer'}}>
                    <p className={styles.title_text}>{verifyTimeToNextMedicine(nextMedicineItem)}</p>

                </div>
                :
                <p className={styles.title_text}>{t('next-medicine.text-no-next')}</p>}
        </div>
    )
}

export default NextMedicine
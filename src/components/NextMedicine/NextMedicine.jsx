import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getNextMedicineItem } from '../../slices/medicineItemSlice';
import { differenceInMinutes } from 'date-fns';

import ModalEditMedicineItem from '../Modal/ModalEditMedicineItem';

const NextMedicine = ({ medicinesItems }) => {

    const dispatch = useDispatch();

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
            textToShow = `Próximo medicamento: ${nextMedicineItem.name} em ${minutesDiff} minutos`;
        } else if (minutesDiff > 60) {
            textToShow = `Próximo medicamento: ${nextMedicineItem.name} em ${calculateTimeForNext(minutesDiff)}`;
        }
        return textToShow;
    }

    const calculateTimeForNext = (time) => {
        const divisor = time / 60;
        const hours = Math.floor(divisor);
        const minutes = (divisor - hours) * 60;

        return `${hours} horas e ${minutes.toFixed(0)} minutos`;
    }


    return (
        <div>
            {nextMedicineItem && <ModalEditMedicineItem dispatch={dispatch} medicine={nextMedicineItem} showModal={showModalEditItem} setCloseModal={()=> setShowModalEditItem(false)}/>}
            <h2>Hoje: {date && date.toLocaleDateString()}</h2>
            {Object.keys(nextMedicineItem).length > 0 ?
                <div onClick={() => setShowModalEditItem(true)} style={{cursor: 'pointer'}}>
                    <p>{verifyTimeToNextMedicine(nextMedicineItem)}</p>

                </div>
                :
                <p>Não há nenhum próximo medicamento...</p>}
        </div>
    )
}

export default NextMedicine
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getNextMedicineItem } from '../../slices/medicineItemSlice';
import { differenceInMinutes } from 'date-fns';

const NextMedicine = () => {

    const dispatch = useDispatch();

    const date = new Date()

    const { nextMedicineItem } = useSelector(state => state.medicineItem);

    useEffect(() => {
        dispatch(getNextMedicineItem());
    }, [dispatch])


    const verifyTimeToNextMedicine = (medicine) => {
        let textToShow = "Não há nenhum próximo medicamento...";
        const laterDate = new Date(medicine.dayHour);
        const minutesDiff = differenceInMinutes(laterDate, date);
        if (minutesDiff <= 60) {
            textToShow = `Próximo medicamento em ${minutesDiff} minutos`;
        } else if (minutesDiff > 60) {
            textToShow = `Próximo medicamento em ${calculateTimeForNext(minutesDiff)}`;
        }
        console.log(minutesDiff);
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
            <h2>Hoje: {date && date.toLocaleDateString()}</h2>
            {Object.keys(nextMedicineItem).length > 0 &&
                <p>{verifyTimeToNextMedicine(nextMedicineItem)}</p>}
        </div>
    )
}

export default NextMedicine
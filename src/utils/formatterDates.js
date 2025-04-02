import { format } from "date-fns";

export const convertToPatternLocalDateTime = (date) => {
    if (!date) return null;
    const conclusionDayHourLocal = new Date(date);
    return conclusionDayHourLocal.toLocaleDateString("pt-BR").split("/").reverse().join("-") +"T"+conclusionDayHourLocal.toLocaleTimeString("pt-BR");
}

export const formatDate = (date) => {
    return format(date, 'dd/MM/yyyy HH:mm')
}

export const ordenateListItensSortedByDate = (medicinesState) => {
    const listObjects = [...medicinesState];

    return listObjects.sort((a, b) => new Date(a.dayHour).getTime() - new Date(b.dayHour).getTime());
}
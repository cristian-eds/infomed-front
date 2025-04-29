
export const ordenateListItensSortedByDate = (medicinesState) => {
    const listObjects = [...medicinesState];

    return listObjects.sort((a, b) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime());
}

export const ordenateListItensSortedByFrequence = (medicinesState) => {
    const listObjects = [...medicinesState];
    return listObjects.sort((a, b) => a.frequencyHours- b.frequencyHours);
}
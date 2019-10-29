import data from '../data.json';

export const fetchData = () => {
    let regions = data.find(item => Object.keys(item)[0] === 'regions')['regions'];
    
    return {
        type: "FETCH_DATA",
        payload: regions
    };
}

export const saveFieldValue = (fieldName, value) => {
    let type = `SAVE_${fieldName.toUpperCase()}`;

    if(!value) return { type, payload: "" };

    if(fieldName === "name" || fieldName === "surname" || fieldName === "patronymic") {
        value = value[0].toUpperCase() + value.slice(1);
    }

    return { type, payload: value };
}
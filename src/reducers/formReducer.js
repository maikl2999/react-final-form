const INITIAL_STATE = {  
    name: null,
    surname: null,
    patronymic: null,
    documentType: 'passport',
    documentNumber: null,
    city: null,
    street: null,
    id: null,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SAVE_NAME":
            return { ...state, name: action.payload };
        case "SAVE_SURNAME":
            return { ...state, surname: action.payload };
        case "SAVE_PATRONYMIC":
            return { ...state, patronymic: action.payload };
        case "SAVE_DOCTYPE":
            return { ...state, documentType: action.payload };
        case "SAVE_DOCNUM":
            return { ...state, documentNumber: action.payload };
        case "SAVE_CITY":
            return { ...state, city: action.payload };
        case "SAVE_STREET":
            return { ...state, street: action.payload };
        default:
            return state;
    }
}
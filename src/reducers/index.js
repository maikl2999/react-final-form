import { combineReducers } from 'redux';
import fetchDataReducer from '../reducers/fetchDataReducer';
import formReducer from '../reducers/formReducer';

export default combineReducers({
    regions: fetchDataReducer,
    formData: formReducer
})
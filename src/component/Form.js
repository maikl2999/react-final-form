import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { fetchData, saveFieldValue } from '../actions';

function changeClass(e) {
  e.currentTarget.firstChild.classList.add("active");
}

const required = value => (value ? undefined : 'Поле не може бути пустим')
const languageValid = value => (
    /^[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя][абвгґдеєжзиіїйклмнопрстуфхцчшщьюя '-]{0,}(\.|[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя])$/gmi
    .test(value.toLowerCase()) ? undefined : 'Поле повинно містити літери лише українського алфавіту'  
    );

const passportValid = value => (
  /^\d{2}((\s[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя’]{6})|[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя’]{6})$/gmi 
  .test(value.toLowerCase()) ? undefined : 'Поле повинно містити 2 цифри та 6 літер, тільки українскою мовою'   
  );

const idCardValid = value => (/^\d{9}$/.test(value.toLowerCase()) ? undefined : 'Поле повинно містити 9 цифр');

const otherDocValid = value => (
  /^\d{2}((\s[a-zабвгґдеєжзиіїйклмнопрстуфхцчшщьюя]{6})|[a-zабвгґдеєжзиіїйклмнопрстуфхцчшщьюя]{6})$/gmi
    .test(value.toLowerCase()) ? undefined : 'Поле повинно містити 2 цифри та 6 літер українскою або англійською мовою'   
);

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

class FinalForm extends React.Component {

  changeValid = () => {
    switch (this.props.formData.documentType) {
      case 'passport':
        return passportValid;
      case 'idcard':
        return idCardValid;
      case 'other':
        return otherDocValid;
      default:
        return passportValid;
    } 
  }

  componentDidMount() {
      this.props.fetchData();
  }

    render () {
        return (
          <Form
            onSubmit={() => alert("from redux\n" + JSON.stringify(this.props.formData, undefined, 2))}
    
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>

                <Field initialValue={ this.props.formData.surname } name="surname" validate={composeValidators(required, languageValid)}>
                  {({ input, meta }) => (
                    <div className="input-field" onFocus={changeClass}>
                        <label>Прізвище*</label>
                        <input
                            type="text"
                            {...input}
                            onChange={(e) => this.props.saveFieldValue(e.target.name, e.target.value)}
                        />
                        {meta.error && meta.touched && <span>{meta.error}</span>}                        
                    </div>
                  )}
                </Field>

                <Field initialValue={ this.props.formData.name } name="name" validate={composeValidators(required, languageValid)}>
                  {({ input, meta }) => (
                    <div className="input-field" onFocus={changeClass}>
                        <label>Ім’я*</label>
                        <input
                            type="text"
                            {...input}
                            onChange={(e) => this.props.saveFieldValue(e.target.name, e.target.value)}                   
                        />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field initialValue={ this.props.formData.patronymic } name="patronymic" validate={composeValidators(required, languageValid)}>
                  {({ input, meta }) => (
                    <div className="input-field" onFocus={changeClass}>
                        <label>По батькові*</label>
                        <input
                            type="text"
                            {...input}
                            onChange={(e) => this.props.saveFieldValue(e.target.name, e.target.value)}                      
                        />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="docType" >
                  {() => (
                    <div className="input-field" onFocus={changeClass}>
                        <label className="active">Тип документа*</label>
                        <select onChange={(e) => this.props.saveFieldValue("docType", e.target.value)}>
                            <option value="passport">Паспорт</option>
                            <option value="idcard">ID карт</option>
                            <option value="other">Інше</option>
                        </select>
                    </div>
                  )}
                </Field>

                <Field initialValue={ this.props.formData.documentNumber } name="docNum" validate={composeValidators(required, this.changeValid())}>
                  {({ input, meta }) => (
                    <div className="input-field" onFocus={changeClass}>
                        <label>Серія та номер документу*</label>
                        <input
                            type="text"
                            {...input}
                            onChange={(e) => this.props.saveFieldValue(e.target.name, e.target.value)}                     
                        />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field initialValue={ this.props.formData.city } name="city">
                  {({ input, meta }) => (
                    <div className="input-field" onFocus={changeClass}>
                        <label>Місто</label>
                        <input
                            type="text"
                            {...input}
                            onChange={(e) => this.props.saveFieldValue(e.target.name, e.target.value)}           
                        />
                    </div>
                  )}
                </Field>

                <Field initialValue={ this.props.formData.street } name="street">
                  {({ input, meta }) => (
                    <div className="input-field" onFocus={changeClass}>
                        <label>Вулиця</label>
                        <input
                            onInput={(e) => e.currentTarget.previousElementSibling.classList.add("active")}
                            type="text"
                            {...input}
                            onChange={(e) => this.props.saveFieldValue(e.target.name, e.target.value)}
                        /> 
                    </div>
                  )}
                </Field>

                <button type="submit">Submit</button>
              </form>
            )}
          />
    )};
};

const mapStateToProps = (state) => {
    return {
      regions: state.regions,
      formData: state.formData
    };
}

export default connect(mapStateToProps, { fetchData, saveFieldValue })(FinalForm);
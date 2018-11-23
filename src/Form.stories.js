import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const EMPTY_OBJECT = {};
class TextInput extends React.Component {
    _safeCallProp(name, ...args) {
        this.props[name] && this.props[name](...args)
    }
    componentWillUnmount() {
        this._safeCallProp('removeFormValue', this.name);
    }
    componentDidMount() {
        this._safeCallProp('setFormValue', this.name, this.props.initialValue);
    }
    handleChange = (evt) => {
        const value = evt.target.value;
        const validator = this.props.validator || (() => true);
        if (validator(value)) {
            const reducer = this.props.reducer || ((v) => v);
            this._safeCallProp('setFormValue', this.name, reducer(evt.target.value));
        }
    }
    get name() {
        return 'index' in this.props
            ? `${this.props.name}[${this.props.index}]`
            : this.props.name;
    }
    get value() {
        const inputWasRegistred = this.name in this.props.values;
        const value = inputWasRegistred
            ? (this.props.values || EMPTY_OBJECT)[this.name]
            : this.props.initialValue;
            
        return value || '';
    }
    render() {
        return (
            <input 
                type="text" 
                name={ this.name } 
                onChange={ this.handleChange }
                placeholder={ this.name }
                value={ this.value } 
            />
        )
    }
}

const omit = (key, obj) => {
    const copy = { ...obj };
    delete copy[key]
    return copy;
}

const isForm = (render) => {
    return class extends React.Component {
        state = {
            values: {},
            errors: {},
        };
        setFormValue = (name, value) => {
            this.setState((state => ({ values: { ...state.values, [name]: value } }))); 
        }
        removeFormValue = (name) => {
            this.setState((() => ({ values: { ...omit(name, this.state.values) } }))); 
        }
        render() {
            return render({ ...this.state, setFormValue: this.setFormValue });
        }
    }
};


const chunk = (str) => {
    return str.replace(/ /g, '').replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
}

storiesOf('Button', module)
  .add('with some emoji', () => {
      const MyForm = isForm((form) => (
        <div>
            <TextInput name="firstName" { ...form }  />
            <TextInput name="lastName" { ...form }  />
            <TextInput name="age" { ...form } validator={ (value) => value.length <= 5 } />
            <TextInput name="iban" { ...form } reducer={ chunk } />  

            <TextInput name="hobbies" index={0} initialValue="sepp" { ...form }  />
            <TextInput name="hobbies" index={1} { ...form }  />
            <TextInput name="hobbies" index={2} { ...form }  />
        </div>
      ));

      return <MyForm />
  });
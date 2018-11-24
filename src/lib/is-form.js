import React from 'react';
const EMPTY_OBJECT = {};
export class TextInput extends React.Component {
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
            return render({ ...this.props, ...this.state, setFormValue: this.setFormValue });
        }
    }
};
export default isForm;
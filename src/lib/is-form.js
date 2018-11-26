import React from 'react';
import { ignoreReturnFor } from 'promise-frites';
import { setValue, removeValue, getValue } from './is-form.utils'

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
        return this.props.name;
    }
    get value() {
        return getValue(this.name, this.props.initialValue || '', this.props.values);     
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

export const Form = ({ onSubmit, children }) => (
    <form onSubmit={onSubmit}>
        {children}
    </form>
);

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
            isSubmitting: false,
            wasSubmitted: false,
        };

        safeSetState = (...args) => 
            new Promise((resolve) => this.setState(...args, resolve));

        onSubmit = (evt) => {
            evt.preventDefault();
            if (!this.props.onSubmit) { return; }
            return Promise.resolve()
                .then(ignoreReturnFor(() => this.safeSetState({ isSubmitting: true })))
                .then(() => this.props.onSubmit(this.state.values))
                .then(ignoreReturnFor(() => this.safeSetState({ isSubmitting: false, wasSubmitted: true })))
                .catch(ignoreReturnFor(() =>  this.safeSetState({ isSubmitting: false, wasSubmitted: false })))
        }

        setFormValue = (name, value) => {
            this.setState((state => ({ values: setValue(name, value, state.values) })));
        }; 
        removeFormField = (name) => {
             this.setState((state => ({ values: removeValue(name, state.values) })));
        }
        render() {
            return render({ 
                ...this.props, 
                form: {
                    ...this.state,
                    setFormValue: this.setFormValue, 
                    addFormField: this.setFormValue,
                    removeFormField: this.removeFormField,
                    onSubmit: this.onSubmit
                }
            });
        }
    }
};
export default isForm;
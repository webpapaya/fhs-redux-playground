import React from 'react';
import { ignoreReturnFor } from 'promise-frites'

const omit = (attributes, obj) => Object.keys(obj).reduce((acc, key) => {
    if (!attributes.includes(key)) { acc[key] = obj[key]; }
    return acc;
}, {});

const buildInputHTMLElement = ({ excludeProps, getValue, getWrapperProp, ...wrapperProps }) => (props) => (
    <input 
        { ...(omit(excludeProps, props)) }
        { ...wrapperProps }
        { ...getValue() }
        { ...(getWrapperProp('name') ? { name: getWrapperProp('name') } : {} )}
    />
);

const buildSelectHTMLElement = ({ excludeProps, getValue, getWrapperProp, ...wrapperProps }) => (props) => (
    <select 
        { ...(omit(excludeProps, props)) }
        { ...wrapperProps }
        { ...getValue() }
        { ...(getWrapperProp('name') ? { name: getWrapperProp('name') } : {} )}
    />
);

const buildOptionHTMLElement = ({ excludeProps }) => (props) => (
    <option 
        { ...(omit(excludeProps, props)) }
    />
);

const buildLabelHTMLElement = ({ excludeProps, getWrapperProp }) => (props) => (
    <label 
        { ...(omit(excludeProps, props)) }
        { ...(getWrapperProp('name') ? { htmlFor: getWrapperProp('name') } : {} )}
    />
);

const HTMLElements = {
    Input: buildInputHTMLElement,
    Label: buildLabelHTMLElement,
    Select: buildSelectHTMLElement,
    Option: buildOptionHTMLElement,
};

const defaultReducer = (v) => v;
const buildInput = ({ reducer = defaultReducer }, InputComponent) => {
    return class InputState extends React.Component {
        state = {
            focused: false,
            touched: false, 
        };

        _safeCallProp(name, ...args) {
            this.props[name] && this.props[name](...args)
        }
        _setState(stateFn) {
            return new Promise((resolve) => this.setState(stateFn, resolve));
        }
        _handleEvent = (evt, eventName, stateFn) => {
            if (this.props.disabled) { return; }
            return this._setState(stateFn)
                .then(ignoreReturnFor(() => this.props[eventName] && this.props[eventName](evt)));   
        }
        componentWillUnmount() {
            this._safeCallProp('removeFormValue', this.props.name);
        }
        componentDidMount() {
            this._safeCallProp('setFormValue', this.props.name, this.props.initialValue);
        }
        handleChange = (evt) => {
            if (this.props.disabled) { return; }

            evt.persist(); // TODO: remove
            evt.target.value = reducer(evt.target.value);
            this._safeCallProp('setFormValue', this.props.name, evt.target.value);
            this._handleEvent(evt, 'onChange', (state) => ({ ...state, touched: true }))
        }
        createDomElements() {
            const args = {
                excludeProps: [
                    ...Object.keys(this.state), 
                    ...Object.keys(HTMLElements), 
                    'getWrapperProp',
                    'getValue',
                    'reducer',
                    'validator',
                ],
                getWrapperProp: this.getWrapperProp,
                getValue: this.getValue,

                onFocus: this.onFocus,
                onBlur: this.onBlur,
                onChange: this.handleChange,
            };

            this._domElements = Object.keys(HTMLElements).reduce((acc, key) => {
                acc[key] = HTMLElements[key](args)
                return acc;
            }, {});
        }
        get domElements() {
            if (!this._domElements) { this.createDomElements(); }
            return this._domElements;            
        }
        getWrapperProp = (name) => this.props[name];
        getValue = () => {
            if (('values' in this.props && 'name' in this.props)) { return { value: this.props.values[this.props.name] }; }
            if (('value' in this.props)) { return { value: this.props.value }; }
            return {};
        }
        onFocus = (evt) => this._handleEvent(evt, 'onFocus',  (state) => ({ ...state, focused: true }));
        onBlur = (evt) => this._handleEvent(evt, 'onBlur',  (state) => ({ ...state, focused: false }));
        render() {
            return (
                <InputComponent
                    { ...this.props } 
                    { ...this.state }
                    { ...this.domElements } 
                />
            );
        }
    }
} 

export default buildInput;
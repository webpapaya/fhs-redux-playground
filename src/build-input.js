import React from 'react';

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

const buildLabelHTMLElement = ({ excludeProps, getWrapperProp, ...wrapperProps }) => (props) => (
    <label 
        { ...(omit(excludeProps, props)) }
        { ...(getWrapperProp('name') ? { htmlFor: getWrapperProp('name') } : {} )}
    />
);

const HTMLElements = {
    TextInput: buildInputHTMLElement,
    Label: buildLabelHTMLElement,
};

const buildInput = (InputComponent) => {
    return class InputState extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                focused: false,
                touched: false, 
            }
        }

        createDomElements() {
            const args = {
                excludeProps: [
                    ...Object.keys(this.state), 
                    ...Object.keys(HTMLElements), 
                    'getWrapperProp',
                    'getValue',
                ],
                getWrapperProp: this.getWrapperProp,
                getValue: this.getValue,

                onFocus: this.onFocus,
                onBlur: this.onBlur,
                onChange: this.onChange,
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

        handleEvent = (evt, eventName, stateFn) => {
            if (this.props.disabled) { return; }
            this.setState(stateFn, () => this.props[eventName] && this.props[eventName](evt));   
        }
        getWrapperProp = (name) => this.props[name];
        getValue = () => {
            if (('values' in this.props && 'name' in this.props)) { return { value: this.props.values[this.props.name] }; }
            if (('value' in this.props)) { return { value: this.props.value }; }
            return {};
        }

        onFocus = (evt) => this.handleEvent(evt, 'onFocus',  (state) => ({ ...state, focused: true }));
        onBlur = (evt) => this.handleEvent(evt, 'onBlur',  (state) => ({ ...state, focused: false }));
        onChange = (evt) => this.handleEvent(evt, 'onChange', (state) => ({ ...state, touched: true }));
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
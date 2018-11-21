import React from 'react';

const omit = (attributes, obj) => Object.keys(obj).reduce((acc, key) => {
    if (!attributes.includes(key)) { acc[key] = obj[key]; }
    return acc;
}, {});

const buildInputHTMLElement = ({ excludeProps, ...wrapperProps }) => (props) => (
    <input 
        { ...(omit(excludeProps, props)) }
        { ...wrapperProps }
    />
);

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
            this._domElements = {
                TextInput: buildInputHTMLElement({
                    excludeProps: Object.keys(this.state),
                    onFocus: this.onFocus,
                    onBlur: this.onBlur,
                    onChange: this.onChange,
                }) 
            };
        }

        get domElements() {
            if (!this._domElements) { this.createDomElements(); }
            return this._domElements;            
        }

        handleEvent = (evt, eventName, stateFn) => {
            if (this.props.disabled) { return; }
            this.setState(stateFn, () => this.props[eventName] && this.props[eventName](evt));   
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
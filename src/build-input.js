import React from 'react';

const omit = (attributes, obj) => Object.keys(obj).reduce((acc, key) => {
    if (!attributes.includes(key)) { acc[key] = obj[key]; }
    return acc;
}, {});

const buildInputHTMLElement = ({ excludeProps, getWrapperProp, ...wrapperProps }) => (props) => (
    <input 
        { ...(omit(excludeProps, props)) }
        { ...wrapperProps }
        { ...(getWrapperProp('name') ? { name: getWrapperProp('name') } : {} )}
    />
);

const buildLabelHTMLElement = ({ excludeProps, getWrapperProp, ...wrapperProps }) => (props) => (
    <label 
        { ...(omit(excludeProps, props)) }
        { ...(getWrapperProp('name') ? { htmlFor: getWrapperProp('name') } : {} )}
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
            const args = {
                excludeProps: [...Object.keys(this.state), 'getWrapperProp', 'Label', 'TextInput'],
                getWrapperProp: this.getWrapperProp,

                onFocus: this.onFocus,
                onBlur: this.onBlur,
                onChange: this.onChange,
            };

            this._domElements = {
                TextInput: buildInputHTMLElement(args),
                Label: buildLabelHTMLElement(args),
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
        getWrapperProp = (name) => this.props[name];


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
import React from 'react';

const omit = (attributes, obj) => Object.keys(obj).reduce((acc, key) => {
    if (!attributes.includes(key)) { acc[key] = obj[key]; }
    return acc;
}, {});

const buildInputHTMLElement = ({ ref, excludeProps, ...wrapperProps }) => (props) => (
    <input 
        ref={ ref }
        { ...(omit(excludeProps, props)) }
        { ...wrapperProps }
    />
);

const buildInput = (InputComponent) => {
    return class InputState extends React.Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef();
            this.state = {
                focused: false,
                changed: false, 
            }
        }
        get domElements() {
            if (!this._domElements) { 
                this._domElements = {
                    Input: buildInputHTMLElement({
                        ref: this.ref,
                        excludeProps: Object.keys(this.state),
                        onFocus: this.onFocus,
                        onBlur: this.onBlur,
                        onChange: this.onChange,
                    }) 
                };
            }
            return this._domElements;            
        }

        handleEvent = (evt, eventName, stateFn) => {
            if (this.props.disabled) { return; }
            this.setState(stateFn, () => this.props[eventName] && this.props[eventName](evt));   
        }

        onFocus = (evt) => this.handleEvent(evt, 'onFocus',  (state) => ({ ...state, focused: true }));
        onBlur = (evt) => this.handleEvent(evt, 'onBlur',  (state) => ({ ...state, focused: false }));
        onChange = (evt) => this.handleEvent(evt, 'onChange', (state) => ({ ...state, changed: true }));
        
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
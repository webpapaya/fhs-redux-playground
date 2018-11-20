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
                isFocused: false,
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
                    }) 
                };
            }
            return this._domElements;            
        }

        onFocus = () => this.setState((state) => ({ ...state, isFocused: true }));
        onBlur = () => this.setState((state) => ({ ...state, isFocused: false }));
        
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
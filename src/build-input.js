import React from 'react';

const buildInputHTMLElement = (registerRef) => (props) => (
    <input 
        {...props} 
        ref={ registerRef } 
    />
);

const buildInput = (InputComponent) => {
    return class InputState extends React.Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef();
        }
        get domElements() {
            if (!this._domElements) { 
                this._domElements = {
                    Input: buildInputHTMLElement(this.ref) 
                };
            }
            return this._domElements;            
        } 

        
        render() {
            return <InputComponent { ...this.props} { ...this.domElements } />
        }
    }
} 

export default buildInput;
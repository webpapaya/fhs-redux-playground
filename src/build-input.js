import React from 'react';

const buildInput = (inputComponent) => {
    const buildInputHTMLElement = (registerRef) => (props) => (
        <input 
            {...props} 
            ref={ registerRef } 
        />
    );

    return class InputState extends React.Component {
        constructor(props) {
            super(props);
            this.ref = React.createRef();
            this.state = {
                isFocused: false,
            }
        }
        getDomElements = () => {
            if (!this.domElements) { 
                this.domElements = {
                    Input: buildInputHTMLElement(this.ref) 
                };
            }
            return this.domElements;            
        } 
        
        render() {
            return inputComponent(this.props, this.contxt, this.getDomElements())
        }
    }
} 


export default buildInput;
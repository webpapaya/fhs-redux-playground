import React from 'react';
import isForm, { Form, TextInput } from '../../lib/is-form';

const EMPTY_ARRAY = [];
export default isForm(({ form }) => {
    const hobbies = form.values.hobbies || EMPTY_ARRAY;
    return (
        <Form { ...form }>
            <TextInput name="firstName" { ...form }  />
            <TextInput name="lastName" { ...form }  />

            { hobbies.map((_, index) => (
                <div>
                    <TextInput key={`hobbies[${index}].name`} name={ `hobbies[${index}].name` } { ...form }  />    
                    <TextInput key={`hobbies[${index}].level`} name={ `hobbies[${index}].level` } { ...form }  /> 
                </div>
            )) }

            <button type="button" onClick={ () => form.addFormField(`hobbies[${hobbies.length}]`, '') }>
                Add hobby
            </button>

            <button disabled={ form.isSubmitting }>
                submit
            </button>
        </Form>
    )
});
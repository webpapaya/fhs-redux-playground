import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';

const EMPTY_ARRAY = [];
export default isForm(({ form }) => {
    const hobbies = form.values.hobbies || EMPTY_ARRAY;
    const hasHobbies =  form.values.hasHobbies === 'yes';
    return (
        <Form { ...form }>
            <TextInput name="hasHobbies" label="Do you have hobbies (enter yes)" { ...form }  />
            
            { hasHobbies && hobbies.map((_, index) => (
                <TextInput name={ `hobbies[${index}]` } label={ `hobby ${index}` } { ...form }  />                
            ))}

            { hasHobbies && (
                <button type="button" onClick={ () => form.addFormField(`hobbies[${hobbies.length}]`, '')}>
                    Add Hobby
                </button>
            )}
            
            <button disabled={ form.isSubmitting }>
                submit
            </button>
        </Form>
    );
});
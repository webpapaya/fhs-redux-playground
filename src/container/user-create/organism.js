import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';

export default isForm(({ form }) => (
    <Form { ...form }>
        <TextInput name="firstName" label="First Name" { ...form }  />
        <TextInput name="lastName" label="Last Name" { ...form }  />
        <button disabled={ form.isSubmitting }>
            submit
        </button>
    </Form>
));
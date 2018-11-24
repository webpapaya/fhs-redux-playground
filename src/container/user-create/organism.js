import React from 'react';
import isForm, { Form, TextInput } from '../../lib/is-form';

export default isForm(({ form }) => (
    <Form { ...form }>
        <TextInput name="firstName" { ...form }  />
        <TextInput name="lastName" { ...form }  />
        <button disabled={ form.isSubmitting }>
            submit
        </button>
    </Form>
));
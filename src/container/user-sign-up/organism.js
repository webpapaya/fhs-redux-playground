import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';

export default isForm(({ form }) => (
    <Form { ...form }>
        <TextInput name="email" label="Email" { ...form }  />
        <TextInput name="password" label="Password" { ...form }  />
        <button disabled={ form.isSubmitting }>
            submit
        </button>
    </Form>
));
import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';
import Link from '../../components/link';
import Button from '../../components/button';

export default isForm(({ form }) => (
    <Form { ...form }>
        <TextInput name="email" label="Email" { ...form }  />
        <TextInput name="password" label="Password" { ...form }  />
        <Button disabled={ form.isSubmitting }>
            submit
        </Button>
        <Link to="user-sign-up">Sign up</Link>
    </Form>
));
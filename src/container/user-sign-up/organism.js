import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';
import Link from '../../components/link';
import Button from '../../components/button';
import styles from './organism.css';

export default isForm(({ form }) => (
    <Form { ...form }>
        <TextInput name="name" label="Name" { ...form }  />
        <TextInput name="email" label="Email" { ...form }  />
        <TextInput name="password" label="Password" { ...form }  />
        <nav className={styles.navigation}>
            <Button type="submit" disabled={ form.isSubmitting } block>
                Sign up
            </Button>
            <Link to="user-sign-in">Sign in</Link>
        </nav>
    </Form>
));
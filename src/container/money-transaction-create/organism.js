import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import NumberInput from '../../components/number-input';

export default isForm(({ form }) => (
    <Form { ...form }>
        <NumberInput name="amont" label="Amount" { ...form }  />
        <button disabled={ form.isSubmitting }>
            submit
        </button>
    </Form>
));
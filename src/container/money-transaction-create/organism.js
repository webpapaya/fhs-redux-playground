import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import NumberInput from '../../components/number-input';
import SelectInput from '../../components/select-input';
import Button from '../../components/button';

export default isForm(({ form, users }) => (
    <Form { ...form }>
        { console.log(users)}
        <NumberInput 
            name="amount" 
            label="Amount" { ...form } 
        />
        <SelectInput 
            label="Debitor"
            name="debitorId"
            options={ users.map(({ id, name }) => ({ value: id, label: name }))} 
            {...form}
        /> 
        <SelectInput 
            label="Creditor"
            name="creditorId"    
            options={ users.map(({ id, name }) => ({ value: id, label: name }))} 
            { ...form }
        /> 
        <Button type="submit" disabled={ form.isSubmitting }>
            submit
        </Button>
    </Form>
));
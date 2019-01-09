import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import { q, where, like } from '../../lib/repository'

import TextInput from '../../components/text-input';
import NumberInput from '../../components/number-input';
import SelectInput from '../../components/select-input';
import Button from '../../components/button';

export default isForm(({ form, users, onUserLoad }) => (
    <Form { ...form }>
        <NumberInput 
            name="amount" 
            label="Amount" { ...form } 
        />
        <TextInput 
            label="Debitor"
            name="debitorId"
            onChange={ (evt) => onUserLoad(q(where({ name: like(`%${evt.target.value}%`, { caseSensitive: false }) }))) }
            {...form} 
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
import React from 'react';
import isForm, { TextInput } from '../../lib/is-form';

export default isForm((form) => (
    <form onSubmit={ (evt) => { evt.preventDefault(); return form.onSubmit(form.values); }}>
        <TextInput name="firstName" { ...form }  />
        <TextInput name="lastName" { ...form }  />
        <button>submit</button>
    </form>
))
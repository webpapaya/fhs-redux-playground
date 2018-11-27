import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import DateTimeInput from '../../components/date-time-input';
import TextInput from '../../components/text-input';

export default isForm(({ form }) => (
    <Form { ...form }>
        <TextInput name="name" label="Name" { ...form }  />
        <DateTimeInput name="startTime" label="Start Time" { ...form }  />
        <DateTimeInput name="endTime" label="End Time" { ...form }  />

        <button disabled={ form.isSubmitting }>
            submit
        </button>
    </Form>
));
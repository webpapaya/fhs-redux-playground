import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import Select from '../../components/select-input';
import HiddenInput from '../../components/hidden-input';

const SelectOrStaticText = ({ options, noSelectionText, ...props }) => options.length === 1
    ? (
        <React.Fragment>
            { options[0].label }
            <HiddenInput { ...props } />
        </React.Fragment>
    ) : (
    <Select
        noSelectionText={ noSelectionText }
        options={ options } 
        { ...props }
    />
);


export default isForm(({ form, users, events }) => (
    <Form { ...form }>
        <SelectOrStaticText 
            name="userId"
            noSelectionText="Please select a user"
            options={ users.map((user) => ({ value: user.id, label:  `${user.firstName} ${user.lastName}` }) )} 
            { ...form }
        />

        <SelectOrStaticText 
            name="eventId"
            noSelectionText="Please select an event"
            options={ events.map((event) => ({ value: event.id, label:  event.name }) )} 
            { ...form }
        />

        <button disabled={ form.isSubmitting }>
            Add Event to 
        </button>
    </Form>
));
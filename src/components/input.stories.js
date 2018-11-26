import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextInput from './text-input';
import IbanInput from './iban-input';

storiesOf('Input', module)
  .add('TextInput', () =>  <TextInput name="text" label="Text input" onChange={ action('onChange') }/>)
  .add('IbanInput', () =>  <IbanInput name="iban" label="Iban input" onChange={ action('onChange') }/>);
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextInput from './text-input';
import IbanInput from './iban-input';
import NumberInput from './number-input';

storiesOf('Input', module)
  .add('TextInput', () =>  <TextInput name="text" label="Text input" onChange={ action('onChange') } showProps />)
  .add('NumberInput', () =>  <NumberInput name="Number" label="Number input" onChange={ action('onChange') } showProps />)
  .add('IbanInput', () =>  <IbanInput name="iban" label="Iban input" onChange={ action('onChange') } showProps />);
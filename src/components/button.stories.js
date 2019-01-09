import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './button';

storiesOf('Button', module)
  .add('default', () =>  <Button>A Button</Button>)
  .add('default disabled', () =>  <Button disabled>A Button</Button>)
  
  .add('danger', () =>  <Button color="danger">A Button</Button>)
  .add('danger disabled', () =>  <Button disabled color="danger">A Button</Button>)
  
  .add('success', () =>  <Button color="success">A Button</Button>)
  .add('success disabled', () =>  <Button disabled color="success">A Button</Button>)

  .add('block', () =>  <Button block>A Button</Button>)

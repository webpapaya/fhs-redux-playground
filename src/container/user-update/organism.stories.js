import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Organism from './organism';

storiesOf('UserSignUp', module)
	.add('default', () => <Organism onSubmit={action('onSubmit')} />);

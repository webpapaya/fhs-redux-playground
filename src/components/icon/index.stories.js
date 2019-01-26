import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon, { NAMES } from './index';

storiesOf('Icon', module)
	.add('default', () => (
		<div>
			{ Object.keys(NAMES).map(name => (
				<div>
					<Icon name={name} />
				</div>
			)) }
		</div>
	));

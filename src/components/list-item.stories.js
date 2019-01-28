import React from 'react';
import { storiesOf } from '@storybook/react';
import List from './list-item';

storiesOf('List', module)
	.add('default', () => (
		<ul>
			<List
				header={(<div>Header</div>)}
				body={(<div>Body</div>)}
			/>
			<List
				header={(<div>Header</div>)}
				body={(<div>Body</div>)}
			/>
			<List
				header={(<div>Header</div>)}
				body={(<div>Body</div>)}
			/>
			<List header={(<div>Without body</div>)} />
		</ul>
	));

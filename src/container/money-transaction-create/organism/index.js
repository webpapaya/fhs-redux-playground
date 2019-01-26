import React from 'react';
import {Tabs, Tab} from '../../../components/tabs';
import Form from './form';

const Organism = props => (
	<Tabs>
		<Tab title="Somebody owes me">
			<Form {...props} onSubmit={props.onCreditCreate} />
		</Tab>
		<Tab title="I owe somebody">
			<Form {...props} onSubmit={props.onDebtCreate} />
		</Tab>
	</Tabs>
);

export default Organism;

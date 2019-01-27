import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '../../../components/tabs';
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

Organism.propTypes = {
	onCreditCreate: PropTypes.func.isRequired,
	onDebtCreate: PropTypes.func.isRequired,
};

export default Organism;

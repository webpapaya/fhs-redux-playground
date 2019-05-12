import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '../../../components/tabs';
import Form from './form';
import { useTranslation } from '../translations';

const Organism = props => {
	const {t} = useTranslation();
	return (
		<Tabs>
			<Tab title={t('somebodyOwesMe')}>
				<Form {...props} onSubmit={props.onCreditCreate} />
			</Tab>
			<Tab title={t('iOweSomebody')}>
				<Form {...props} onSubmit={props.onDebtCreate} />
			</Tab>
		</Tabs>
	)
};

Organism.propTypes = {
	onCreditCreate: PropTypes.func.isRequired,
	onDebtCreate: PropTypes.func.isRequired,
};

export default Organism;

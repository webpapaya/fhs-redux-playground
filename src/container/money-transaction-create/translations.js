/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	de: {
		amount: 'Betrag',
		iOweSomebody: 'Ich schulde jemanden',
		somebodyOwesMe: 'Jemand schuldet mir',
		submit: 'Speichern',
		user: 'Nutzer',
	},
	en: {
		amount: 'Amount',
		iOweSomebody: 'I owe somebody',
		somebodyOwesMe: 'Sombody owes me',
		submit: 'Submit',
		user: 'User',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);

import React, { useContext, useState } from 'react';
import IntlMessageFormat from 'intl-messageformat';

const defaultLocales = {
	usd: '{value, number, USD}',
	eur: '{value, number, EUR}',
};

const path = (p, object) => p.reduce((value, chunk) => {
	if (chunk in value) { return value[chunk]; }
	return undefined;
}, object || {});

const t = (message, locale, options = {}) => {
	const msg = new IntlMessageFormat(message, { ...defaultLocales, ...locale}, {
		number: {
			USD: {
					style   : 'currency',
					currency: 'USD',
					minimumFractionDigits: 2,
			},
			EUR: {
				style   : 'currency',
				currency: 'EUR',
				minimumFractionDigits: 2,
			}
		}
	});
	return msg.format(options);
};

const LocaleContext = React.createContext({ locale: 'en-US', setLocale: () => {} });
export const Locale = ({ children }) => { // eslint-disable-line react/prop-types
	const [locale, setLocale] = useState('en-US');
	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			{ children }
		</LocaleContext.Provider>
	);
};

export const buildUseTranslations = messages => () => {
	const { locale, setLocale } = useContext(LocaleContext);
	const languageCode = locale.split('-')[0];
	return {
		setLocale,
		t: (id, options = {}) => {
			const message = path([languageCode, id], messages) || path([locale, id], messages);
			return t(message, locale, options);
		},
	};
};

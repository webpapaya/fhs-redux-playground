import { assocPath, dissocPath, pathOr } from 'ramda';

const toNumberIfNumerical = (value) => {
	const parsed = parseInt(value, 10);
	return Number.isNaN(parsed)
		? value
		: parsed;
};

const nameToPath = name => (name.match(/([a-zA-Z]+|[\d])/g) || []).map(toNumberIfNumerical);

export const setValue = (name, value, values) => assocPath(nameToPath(name), value, values);

export const removeValue = (name, values) => dissocPath(nameToPath(name), values);

export const getValue = (name, defaultValue, values) => pathOr(defaultValue, nameToPath(name), values);

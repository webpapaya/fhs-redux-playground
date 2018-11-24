import { assertThat, equalTo } from 'hamjest';
import { assocPath, dissocPath } from 'ramda';

const toNumberIfNumerical = (value) => {
    const parsed = parseInt(value);
    return Number.isNaN(parsed)
        ? value
        : parsed;
}

const nameToPath = (name) => 
    (name.match(/([a-zA-Z]+|[\d])/g) || []).map(toNumberIfNumerical)

const addValue = (name, value, previousValues) => 
    assocPath(nameToPath(name), value, previousValues);

const removeValue = (name, previousValues) => 
    dissocPath(nameToPath(name), previousValues);

describe('addValue', () => {
    it('when previousValues empty', () =>
        assertThat(addValue('name', 'value', {}), equalTo({ name: 'value' })));

    it('when name is an array', () =>
        assertThat(addValue('contact[0]', 'value', {}), equalTo({ contact: ['value'] })));

    it('when name is an array of objects', () =>
        assertThat(addValue('contact[0].street', 'value', {}), equalTo({ contact: [{ street: 'value' }] })));
});

describe('removeValue', () => {
    it('when name is a deeply nested path', () =>
        assertThat(removeValue('contact[0].street', { contact: [{ street: 'value' }] }), equalTo({ contact: [{}] })));

    it('when name is an array item', () =>
        assertThat(removeValue('contact[0]', { contact: [{ street: 'value' }] }), equalTo({ contact: [] })));
});
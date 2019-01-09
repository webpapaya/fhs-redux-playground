import { assertThat, equalTo } from 'hamjest';
import { setValue, removeValue } from './is-form.utils';


describe('setValue', () => {
	it('when previousValues empty', () => {
		assertThat(setValue('name', 'value', {}), equalTo({ name: 'value' }));
	});

	it('when name is an array', () => {
		assertThat(setValue('contact[0]', 'value', {}), equalTo({ contact: ['value'] }));
	});

	it('when name is an array of objects', () => {
		assertThat(setValue('contact[0].street', 'value', {}), equalTo({ contact: [{ street: 'value' }] }));
	});
});

describe('removeValue', () => {
	it('when name is a deeply nested path', () => {
		assertThat(removeValue('contact[0].street', { contact: [{ street: 'value' }] }), equalTo({ contact: [{}] }));
	});

	it('when name is an array item', () => {
		assertThat(removeValue('contact[0]', { contact: [{ street: 'value' }] }), equalTo({ contact: [] }));
	});
});

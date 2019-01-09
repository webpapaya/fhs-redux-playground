import createReduxMemoizeMiddleware from 'redux-memoize';

class ClearableWeakMap {
	constructor(init) {
		this._wm = new WeakMap(init);
	}

	clear() {
		this._wm = new WeakMap();
	}

	delete(k) {
		return this._wm.delete(k);
	}

	get(k) {
		return this._wm.get(k);
	}

	has(k) {
		return this._wm.has(k);
	}

	set(k, v) {
		this._wm.set(k, v);
		return this;
	}
}

export const cache = new ClearableWeakMap();
export const createMemoizeMiddleware = createReduxMemoizeMiddleware({ ttl: 99999999, cache });

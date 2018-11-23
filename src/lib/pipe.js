// Could be replaced by ramda/lodash
export default (...fns) => (initialValue) => fns.reverse().reduce((result, fn) => fn(result), initialValue)
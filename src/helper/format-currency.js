export default (number) => {
    const parsedNumber = parseFloat(number);
    const normalizedNumber = Number.isNaN(parsedNumber) ? 0 : parsedNumber;
    return `${normalizedNumber.toFixed(2)} €`;
}
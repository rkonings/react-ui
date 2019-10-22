import Number from './Number';
export const currencyToNumber = (value: string) => {
    return Number.unformat(value);
};

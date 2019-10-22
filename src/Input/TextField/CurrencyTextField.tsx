import React from 'react';
import styled from 'styled-components';
import { currencyToNumber } from '../../Formatter/currencyToNumber';
import { numberFormatter } from '../../Formatter/index';
import TextField, { TextFieldProps } from './TextField';

const CurrencyTextField = (props: TextFieldProps) => {
    let value = '';

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const el = e.currentTarget;
        const {key} = e;
        const {value} = el;

        if (key === ',') {
            if (value.length > 3 && value.length - 3 === el.selectionStart) {
                el.setSelectionRange(el.selectionStart + 1, el.selectionStart + 1);
            }
            e.preventDefault();
        } else if (key === 'Backspace' && value.length > 3 && value.length - 2 === el.selectionStart) {
            if (value.length > 3 && value.length - 2 === el.selectionStart) {
                e.preventDefault();
            }
        }

    };

    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const el = e.currentTarget;

        if (el.value === '') {
            return;
        }

        let currentCaretPosition = el.selectionStart || 0;
        const newValue = currencyToNumber(el.value);
        const formattedValue = numberFormatter({value: newValue, type: 'currency'});

        if (formattedValue.length > 4 && currentCaretPosition < value.length - 1) {
            if (value.length + 2 === formattedValue.length) {
                currentCaretPosition = currentCaretPosition + 1;
            } else if (value.length - 2 === formattedValue.length) {
                currentCaretPosition = currentCaretPosition - 1;
            }
        }

        el.setSelectionRange(currentCaretPosition, currentCaretPosition);
        setTimeout(() => {
            el.setSelectionRange(currentCaretPosition, currentCaretPosition);
        }, 0);

        if (formattedValue !== 'NaN' ) {
            value = formattedValue;
            el.value = formattedValue;
        } else {
            el.value = '';
        }
        return true;

    };

    return (
        <TextField
            {...props}
            prefix="€"
            placeHolder={numberFormatter({type: 'currency', value: 0})}
            onKeyDown={onKeyDownHandler}
            onChange={onChangeHandler}
        />
    );
};

export default styled(CurrencyTextField)`

`;

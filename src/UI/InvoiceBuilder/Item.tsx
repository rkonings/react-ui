import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import styled from 'styled-components';
import CurrencyTextField from '../../Input/TextField/CurrencyTextField';
import TextField from '../../Input/TextField/TextField';
import { ItemData } from './interfaces';

interface Item {
    className?: string;
    name?: string;
    price?: number;
    quantity?: number;
    tax?: number;
    inputNamePrefix: string;
    errors?: FormikErrors<ItemData>;
    touched?: FormikTouched<ItemData>;
    onBlur(e: React.FormEvent<HTMLInputElement>): void;
    onChange(e: React.FormEvent<HTMLInputElement>): void;
    setFieldValue(field: string, value: string | number): void;
}

const Name = styled.div`
    flex: 1;
    margin-right: 25px;
`;
const Price = styled.div`
    width: 120px;
    margin-right: 25px;
`;

const Total = styled.div`
    width: 120px;
`;
const Quantity = styled.div`
    width: 75px;
    margin-right: 25px;
`;
const Tax = styled.div`
    width: 50px;
    margin-right: 25px;
`;

const calculateTotal = (price?: number, quantity?: number, tax?: number) => {
    if (price && quantity && tax) {
        return price * quantity * (100 + tax) / 100;
    }

    return undefined;
};

const Item = ({className, name, price, quantity, tax, errors, onChange, onBlur,
    inputNamePrefix, touched, setFieldValue}: Item) => {
    const total = calculateTotal(price, quantity, tax);

    return (
        <div className={className}>
            <Name>
                <TextField
                    grow={true}
                    value={name}
                    placeHolder="Product name"
                    onChange={onChange}
                    onBlur={onBlur}
                    name={inputNamePrefix + '.name'}
                    errorText={touched && touched.name && errors ? errors.name : undefined}

                />
            </Name>
            <Quantity>
                <TextField
                    grow={true}
                    value={quantity ? quantity.toString() : undefined}
                    textAlign="right"
                    postfix="x"
                    onChange={onChange}
                    onBlur={onBlur}
                    name={inputNamePrefix + '.quantity'}
                    errorText={touched && touched.quantity && errors ? errors.quantity : undefined}
                />
            </Quantity>
            <Price>
                <CurrencyTextField
                    grow={true}
                    value={price || 0}
                    textAlign="right"
                    placeHolder="0,00"
                    prefix="€"
                    onChange={(e: number) => setFieldValue(inputNamePrefix + '.price', e)}
                    onBlur={onBlur}
                    name={inputNamePrefix + '.price'}
                    errorText={touched && touched.price && errors ? errors.price : undefined}
                />
            </Price>
            <Tax>
                <TextField
                    grow={true}
                    value={tax ? tax.toString() : undefined}
                    textAlign="right"
                    postfix="%"
                    onBlur={onBlur}
                    name={inputNamePrefix + '.tax'}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        setFieldValue(inputNamePrefix + '.tax', parseInt(e.currentTarget.value, 10))}
                    errorText={touched && touched.tax && errors ? errors.tax : undefined}
                />
            </Tax>
            <Total>
                <CurrencyTextField
                    grow={true}
                    placeHolder="0,00"
                    value={total || 0}
                    textAlign="right"
                    prefix="€"
                    readOnly={true}
                /></Total>
        </div>
    );
};

export default styled(Item)`
    display: flex;
    flex-direction: row;
`;

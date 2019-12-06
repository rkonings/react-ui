import dotProp from 'dot-prop';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Popover from '../Popover/Popover';
// import { ValidationErrors, ChangedItems, OnChangeHandler, mapValidationErrors } from '../UI/Settings';

export type ValidationErrors = Map<string, string>;
export interface ChangedItem {
  field: string;
  value: string | boolean | number;
}

export interface ChangeOptions {
  saveFields?: boolean;
}
export type ChangedItems = ChangedItem[];
export type OnChangeHandler = (
  items: ChangedItems,
  options?: ChangeOptions,
  callBack?: () => void
) => void;

export const mapValidationErrors = (error: Yup.ValidationError) => {
    if (error.inner.length > 0) {
      return error.inner.reduce((obj: ValidationErrors, item: Yup.ValidationError) => {
        return obj.set(item.path, item.message);
      }, new Map());
    } else {
      const errorsMap = new Map<string, string>();
      errorsMap.set(error.path, error.message);
      return errorsMap;
    }
  };

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    font-size: 24px;
    font-weight: 200;
`;

interface PopoverInputProps<T> {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    errors: ValidationErrors;
    values: T;
    onChange: (field: string, value: boolean | number | string) => void;
    onSave: () => void;
    onCancel: () => void;
}

interface PopoverInput<T> {
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
    values: T;
    link: (values: T) => JSX.Element;
    label: (values: T) => string | JSX.Element | JSX.Element[];
    children: (props: PopoverInputProps<T>) => string | JSX.Element | JSX.Element[];
}

export const PopoverInput = <T extends {}>({label, onChange, errors, values, children,
    validationSchema, link}: PopoverInput<T>) => {

    const [ inputValues, setInputValues ] = React.useState<T>(values);
    const [ inputErrors, setInputErrors ] = React.useState<ValidationErrors>(errors);

    React.useEffect(() => {
        setInputValues({...values});
    }, [values]);

    const onChangeInputField = async (field: string, value: boolean | number | string) => {
        const values = {...inputValues};
        dotProp.set(values, field, value);
        setInputValues(values);

        validationSchema.validateAt(field, values).then(() => {
            const errors = new Map(inputErrors);
            errors.delete(field);
            setInputErrors(errors);
        }).catch((error) => {
            const errors = mapValidationErrors(error);
            setInputErrors(errors);
        });
    };

    const onSave = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        const values = Object.entries(inputValues).map(([key, value]) => ({field: key, value}));
        if (inputErrors.size === 0) {
            onChange(values as ChangedItems, { saveFields: true }, () => {
                setOpen(false);
            });
        }
    };

    const onCancel = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        setInputValues(values);
        setOpen(false);
    };

    return (
        <Wrapper>
            {label(values)}
            <Popover link={link(values)}>
                {(setOpen) => children({
                    setOpen,
                    errors: inputErrors,
                    values: inputValues,
                    onChange: onChangeInputField,
                    onSave: () => onSave(setOpen),
                    onCancel: () => onCancel(setOpen)
                })}
            </Popover>
        </Wrapper>
    );
};

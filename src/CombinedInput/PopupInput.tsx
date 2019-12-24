import dotProp from 'dot-prop';
import React from 'react';
import * as Yup from 'yup';
import Popup, { PopupCore, PopupPosition } from '../Popup/Popup';

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
        return error.inner.reduce(
            (obj: ValidationErrors, item: Yup.ValidationError) => {
                return obj.set(item.path, item.message);
            },
            new Map()
        );
    } else {
        const errorsMap = new Map<string, string>();
        errorsMap.set(error.path, error.message);
        return errorsMap;
    }
};

interface PopupInputProps<T> {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    errors: ValidationErrors;
    values: T;
    onChange: (field: string, value: boolean | number | string) => void;
    onSave: () => void;
    onCancel: () => void;
}

interface PopupCoreInputProps<T> {
    errors: ValidationErrors;
    values: T;
    onChange: (field: string, value: boolean | number | string) => void;
    onSave: (callBackFunction?: () => void) => void;
    onCancel: (callBackFunction?: () => void) => void;
}

interface PopoverInput<T> {
    onChange: OnChangeHandler;
    errors?: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
    width?: string;
    height?: string;
    isOpen?: boolean;
    values: T;
    link?: JSX.Element;
    position?: PopupPosition;
    children: (
        props: PopupInputProps<T>
    ) => string | JSX.Element | JSX.Element[];
}

interface PopupCoreInput<T> {
    onChange: OnChangeHandler;
    values: T;
    validationSchema: Yup.ObjectSchema;
    width?: string;
    height?: string;
    position?: PopupPosition;
    clickAway?: () => void;
    children: (
        props: PopupCoreInputProps<T>
    ) => string | JSX.Element | JSX.Element[];
}

export const PopupCoreInput = <T extends {}>({
    children,
    clickAway,
    values,
    onChange,
    validationSchema,
    position = 'CENTER',
}: PopupCoreInput<T>) => {
    const [inputValues, setInputValues] = React.useState<T>(values);
    const [inputErrors, setInputErrors] = React.useState<ValidationErrors>(
        new Map()
    );

    React.useEffect(() => {
        setInputValues({ ...values });
    }, [values]);

    const onChangeInputField = async (
        field: string,
        value: boolean | number | string
    ) => {
        const values = { ...inputValues };
        dotProp.set(values, field, value);
        setInputValues(values);

        validationSchema
            .validateAt(field, values)
            .then(() => {
                const errors = new Map(inputErrors);
                errors.delete(field);
                setInputErrors(errors);
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };

    const onSave = () => {
        validationSchema
            .validate(inputValues, { abortEarly: false })
            .then(() => {
                setInputErrors(new Map());
                const values = Object.entries(inputValues).map(
                    ([key, value]) => ({
                        field: key,
                        value,
                    })
                );
                onChange(
                    values as ChangedItems,
                    { saveFields: true },
                    () => {}
                );
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };

    const onCancel = (callBackFunction?: () => void) => {
        if (callBackFunction) {
            callBackFunction();
        }
    };

    return (
        <PopupCore position={position} clickAway={clickAway}>
            <React.Fragment>
                {children({
                    errors: inputErrors,
                    values: inputValues,
                    onSave,
                    onChange: onChangeInputField,
                    onCancel,
                })}
            </React.Fragment>
        </PopupCore>
    );
};

export const PopupInput = <T extends {}>({
    children,
    values,
    onChange,
    errors,
    validationSchema,
    link,
    isOpen,
    width,
    height,
    position = 'CENTER',
}: PopoverInput<T>) => {
    const [inputValues, setInputValues] = React.useState<T>(values);
    const [inputErrors, setInputErrors] = React.useState<ValidationErrors>(
        errors || new Map()
    );

    React.useEffect(() => {
        setInputValues({ ...values });
    }, [values]);

    const onChangeInputField = async (
        field: string,
        value: boolean | number | string
    ) => {
        const values = { ...inputValues };
        dotProp.set(values, field, value);
        setInputValues(values);

        validationSchema
            .validateAt(field, values)
            .then(() => {
                const errors = new Map(inputErrors);
                errors.delete(field);
                setInputErrors(errors);
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };

    const onSave = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        validationSchema
            .validate(inputValues, { abortEarly: false })
            .then(() => {
                setInputErrors(new Map());
                const values = Object.entries(inputValues).map(
                    ([key, value]) => ({
                        field: key,
                        value,
                    })
                );
                onChange(values as ChangedItems, { saveFields: true }, () => {
                    setOpen(false);
                });
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };

    const onCancel = (
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setInputValues(values);
        setInputErrors(new Map());
        setOpen(false);
    };
    return (
        <Popup
            position={position}
            width={width}
            height={height}
            isOpen={isOpen}
            link={link}
        >
            {setOpen =>
                children({
                    setOpen,
                    errors: inputErrors,
                    values: inputValues,
                    onChange: onChangeInputField,
                    onSave: () => onSave(setOpen),
                    onCancel: () => onCancel(setOpen),
                })
            }
        </Popup>
    );
};

export default PopupInput;

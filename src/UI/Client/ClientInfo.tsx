import dotProp from 'dot-prop';
import React from 'react';
import styled from 'styled-components';
import Button from '../../Button/Button';
import { ChangedItems, InputField, OnChangeHandler } from '../../Form';
import { InlineEditableTextField } from '../../Input/InlineEditable/InlineEditableTextField';
import { Title } from '../../Layout/Title';
import { ValidationErrors, Yup } from '../../Validation';

export interface Client {
    _id: string;
    name: string;
    telephone: string;
    address: string;
    zipcode: string;
    city: string;
    type: string;
}

interface ClientInfo {
    className?: string;
    onChange: OnChangeHandler;
    client: Client;
}

const validationSchema = Yup.object({
    _id: Yup.string(),
    name: Yup.string().min(1, 'company name is required'),
    telephone: Yup.string().matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is not valid'
    ),
    address: Yup.string()
        .required('Address is required')
        .matches(
            /^([1-9][e][\s])*([a-zA-Z]+(([\.][\s])|([\s]))?)+[1-9][0-9]*(([-][1-9][0-9]*)|([\s]?[a-zA-Z]+))?$/i,
            'Address is not valid'
        ),
    city: Yup.string().required('city is required'),
    zipcode: Yup.string()
        .required('zipcode is required')
        .matches(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i, 'Zipcode is not valid'),
    type: Yup.string().required('type is required'),
});

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

const ClientInfo = ({ className, client, onChange }: ClientInfo) => {
    const [inputValues, setInputValues] = React.useState(client);
    const [inputErrors, setInputErrors] = React.useState<ValidationErrors>(
        new Map()
    );
    React.useEffect(() => {
        setInputValues({ ...client });
    }, [client]);

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
    return (
        <div className={className}>
            <Title>{client.name}</Title>
            <InputField spacingBottom="1em">
                <InlineEditableTextField
                    value={inputValues.type}
                    label="Type"
                    grow={true}
                    placeHolder="Type"
                    onChange={e =>
                        onChangeInputField('type', e.currentTarget.value)
                    }
                    errorText={inputErrors.get('type')}
                />
            </InputField>
            <InputField spacingBottom="1em">
                <InlineEditableTextField
                    value={inputValues.telephone}
                    label="Telephone"
                    grow={true}
                    placeHolder="Telephone"
                    onChange={e =>
                        onChangeInputField('telephone', e.currentTarget.value)
                    }
                    errorText={inputErrors.get('telephone')}
                />
            </InputField>
            <InputField spacingBottom="1em">
                <InlineEditableTextField
                    value={inputValues.name}
                    label="Name"
                    grow={true}
                    placeHolder="Name"
                    onChange={e =>
                        onChangeInputField('name', e.currentTarget.value)
                    }
                    errorText={inputErrors.get('name')}
                />
            </InputField>
            <InputField spacingBottom="1em">
                <InlineEditableTextField
                    value={inputValues.address}
                    label="Address"
                    grow={true}
                    placeHolder="Address"
                    onChange={e =>
                        onChangeInputField('address', e.currentTarget.value)
                    }
                    errorText={inputErrors.get('address')}
                />
            </InputField>
            <InputField spacingBottom="1em">
                <InlineEditableTextField
                    value={inputValues.zipcode}
                    label="zipcode"
                    grow={true}
                    placeHolder="Zipcode"
                    onChange={e =>
                        onChangeInputField('zipcode', e.currentTarget.value)
                    }
                    errorText={inputErrors.get('zipcode')}
                />
            </InputField>
            <InputField spacingBottom="1em">
                <InlineEditableTextField
                    value={inputValues.city}
                    label="City"
                    grow={true}
                    placeHolder="City"
                    onChange={e =>
                        onChangeInputField('city', e.currentTarget.value)
                    }
                    errorText={inputErrors.get('city')}
                />
            </InputField>
            <InputField spacingBottom="1em">
                <Button size="s" onClick={() => onSave()}>
                    Save
                </Button>
            </InputField>
        </div>
    );
};

export default styled(ClientInfo)``;

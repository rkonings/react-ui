import React from 'react';
import * as Yup from 'yup';

import { OnChangeHandler } from '../../Form';
import { InputField } from '../../Form';
import Select from '../../Input/Select/Select';
import TextField from '../../Input/TextField/TextField';
import { Section } from '../../SettingsField';
import { ValidationErrors } from '../../Validation';
import { Offer } from '../OfferForm';

interface BasicInfo {
    data: Offer;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}

export default ({ data, onChange, errors }: BasicInfo) => {
    return (
        <React.Fragment>
            <Section>
                <InputField>
                    <Select
                        width="400px"
                        label="Offer type"
                        options={['particulier', 'zakelijk']}
                        value={data.type}
                        onChange={value => onChange([{ field: 'type', value }])}
                        errorText={errors.get('type')}
                    />
                </InputField>
                <InputField>
                    <TextField
                        value={data.date}
                        width="400px"
                        label="Offer date"
                        placeHolder="Date"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'date',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('date')}
                    />
                </InputField>
                <InputField>
                    <TextField
                        value={data.reference}
                        width="400px"
                        label="Offer reference"
                        placeHolder="Reference"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'reference',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('reference')}
                    />
                </InputField>
                <InputField>
                    <TextField
                        value={data.expiration}
                        width="400px"
                        label="Offer expiration"
                        placeHolder="14"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'expiration',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        postfix="dagen"
                        errorText={errors.get('expiration')}
                        helperText="14 or 30 days"
                    />
                </InputField>
                <InputField>
                    <TextField
                        value={data.client}
                        width="400px"
                        label="Client"
                        placeHolder="J. Janssen"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'client',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('client')}
                    />
                </InputField>
                <InputField>
                    <TextField
                        value={data.user}
                        width="400px"
                        label="Verantwoordelijke"
                        placeHolder="R. Konings"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'user',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('user')}
                    />
                </InputField>
            </Section>
        </React.Fragment>
    );
};

import React from 'react';
import * as Yup from 'yup';

import { OnChangeHandler } from '../../Form';
import { InputField } from '../../Form';
import TextField from '../../Input/TextField/TextField';
import { Section } from '../../SettingsField';
import { ValidationErrors } from '../../Validation';
import { Offer } from '../OfferForm';

interface AssemblyInfo {
    data: Offer;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}

export default ({ data, onChange, errors }: AssemblyInfo) => {
    return (
        <React.Fragment>
            <Section>
                <InputField>
                    <TextField
                        value={
                            data.assemblyHours && data.assemblyHours.assembly
                        }
                        width="400px"
                        label="Assembly"
                        placeHolder="20"
                        postfix="hours"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'assemblyHours.assembly',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('assemblyHours.assembly')}
                    />
                </InputField>

                <InputField>
                    <TextField
                        value={
                            data.assemblyHours && data.assemblyHours.electricity
                        }
                        width="400px"
                        label="Electricity"
                        placeHolder="20"
                        postfix="hours"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'assemblyHours.electricity',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('assemblyHours.electricity')}
                    />
                </InputField>

                <InputField>
                    <TextField
                        value={
                            data.assemblyHours &&
                            data.assemblyHours.refrigeration
                        }
                        width="400px"
                        label="Refrigeration"
                        placeHolder="20"
                        postfix="hours"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'assemblyHours.refrigeration',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('assemblyHours.refrigeration')}
                    />
                </InputField>
            </Section>
        </React.Fragment>
    );
};

import React from 'react';
import * as Yup from 'yup';

import { OnChangeHandler } from '../../Form';
import Select from '../../Input/Select/Select';
import { Section } from '../../SettingsField';
import { ValidationErrors } from '../../Validation';

import TextField from '../../Input/TextField/TextField';

import { InputField } from '../../Form';

import { Offer } from '../OfferForm';

interface InstallationInfo {
    data: Offer;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}

export default ({ data, onChange, errors }: InstallationInfo) => {
    return (
        <React.Fragment>
            <Section>
                <InputField>
                    <TextField
                        value={
                            data.installation &&
                            data.installation.amountDrillHoles
                        }
                        width="400px"
                        label="Amount drill holes"
                        placeHolder="2"
                        postfix="holes"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'installation.amountDrillHoles',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('installation.amountDrillHoles')}
                    />
                </InputField>
                <InputField>
                    <TextField
                        value={
                            data.installation && data.installation.coolingPipe
                        }
                        width="400px"
                        label="Cooling pipe"
                        placeHolder="10"
                        postfix="m"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'installation.coolingPipe',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('installation.coolingPipe')}
                    />
                </InputField>
                <InputField>
                    <Select
                        width="400px"
                        label="Wall bracket"
                        options={['', '< 40kg', '> 40kg']}
                        value={
                            data.installation &&
                            data.installation.mounting &&
                            data.installation.mounting.wallBracket
                        }
                        onChange={value =>
                            onChange([
                                {
                                    field: 'installation.mounting.wallBracket',
                                    value,
                                },
                            ])
                        }
                        errorText={errors.get(
                            'installation.mounting.wallBracket'
                        )}
                    />
                </InputField>
                <InputField>
                    <TextField
                        width="400px"
                        label="Roof terminal"
                        postfix="amount"
                        placeHolder="0"
                        value={
                            data.installation &&
                            data.installation.mounting &&
                            data.installation.mounting.roofTerminal
                        }
                        onChange={e =>
                            onChange([
                                {
                                    field: 'installation.mounting.roofTerminal',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get(
                            'installation.mounting.roofTerminal'
                        )}
                    />
                </InputField>
                <InputField>
                    <TextField
                        width="400px"
                        label="Sidebars"
                        postfix="amount"
                        placeHolder="0"
                        value={
                            data.installation &&
                            data.installation.mounting &&
                            data.installation.mounting.sidebars
                        }
                        onChange={e =>
                            onChange([
                                {
                                    field: 'installation.mounting.sidebars',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('installation.mounting.sidebars')}
                    />
                </InputField>
            </Section>
        </React.Fragment>
    );
};

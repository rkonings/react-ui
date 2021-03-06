import React from 'react';
import * as Yup from 'yup';

import { OnChangeHandler } from '../../Form';
import { InputField } from '../../Form';
import Select from '../../Input/Select/Select';
import TextField from '../../Input/TextField/TextField';
import { Section } from '../../SettingsField';
import { ValidationErrors } from '../../Validation';
import { Offer } from '../OfferForm';

interface ElectricityInfo {
    data: Offer;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}

export default ({ data, onChange, errors }: ElectricityInfo) => {
    return (
        <React.Fragment>
            <Section>
                <InputField>
                    <TextField
                        value={
                            data.installation &&
                            data.installation.electricity.communication
                        }
                        width="400px"
                        label="Communication cable"
                        placeHolder="20"
                        postfix="m"
                        onChange={e =>
                            onChange([
                                {
                                    field:
                                        'installation.electricity.communication',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get(
                            'installation.electricity.communication'
                        )}
                    />
                </InputField>

                <InputField>
                    <TextField
                        value={
                            data.installation &&
                            data.installation.electricity.control
                        }
                        width="400px"
                        label="Control cable"
                        placeHolder="20"
                        postfix="m"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'installation.electricity.control',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get(
                            'installation.electricity.control'
                        )}
                    />
                </InputField>

                <InputField>
                    <TextField
                        value={
                            data.installation &&
                            data.installation.electricity.power
                        }
                        width="400px"
                        label="Power cable"
                        placeHolder="20"
                        postfix="m"
                        onChange={e =>
                            onChange([
                                {
                                    field: 'installation.electricity.power',
                                    value: e.currentTarget.value,
                                },
                            ])
                        }
                        errorText={errors.get('installation.electricity.power')}
                    />
                </InputField>
                <InputField>
                    <Select
                        width="400px"
                        label="Power group"
                        options={['none', '16A', '25A']}
                        value={
                            (data.installation &&
                                data.installation.electricity.powerGroup) ||
                            ''
                        }
                        onChange={value =>
                            onChange([
                                {
                                    field:
                                        'installation.electricity.powerGroup',
                                    value,
                                },
                            ])
                        }
                        errorText={errors.get(
                            'installation.electricity.powerGroup'
                        )}
                    />
                </InputField>
            </Section>
        </React.Fragment>
    );
};

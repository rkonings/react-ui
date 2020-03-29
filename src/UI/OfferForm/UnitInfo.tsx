import React from 'react';
import * as Yup from 'yup';

import { OnChangeHandler } from '../../Form';
import Select from '../../Input/Select/Select';
import { Section } from '../../SettingsField';
import { ValidationErrors } from '../../Validation';

import { InputField } from '../../Form';

import { Offer } from '../OfferForm';

interface UnitInfo {
    data: Offer;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}

export default ({ data, onChange, errors }: UnitInfo) => {
    return (
        <React.Fragment>
            <Section>
                <InputField>
                    <Select
                        width="400px"
                        label="Installation type"
                        options={['single', 'multi', 'vrf']}
                        value={data.installation && data.installation.type}
                        onChange={value =>
                            onChange([{ field: 'installation.type', value }])
                        }
                        errorText={errors.get('installation.type')}
                    />
                </InputField>
                <InputField>
                    <Select
                        width="400px"
                        label="Outdoor Unit"
                        options={[
                            '2.0 kW',
                            '2.5 kW',
                            '3.0 kW',
                            '3.5 kW',
                            '4.0 kW',
                        ]}
                        value={
                            data.installation &&
                            data.installation.outdoorUnits &&
                            data.installation.outdoorUnits[0]
                        }
                        onChange={value =>
                            onChange([
                                {
                                    field: 'installation.outdoorUnits.0',
                                    value,
                                },
                            ])
                        }
                        errorText={errors.get('installation.outdoorUnits.0')}
                    />
                </InputField>
                {data.installation &&
                    data.installation.type === 'multi' &&
                    [0, 1, 2, 3].map((i: number) => (
                        <InputField key={i}>
                            <Select
                                width="400px"
                                label={`Indoor unit ${i + 1}`}
                                options={[
                                    '',
                                    '2.0 kW',
                                    '2.5 kW',
                                    '3.0 kW',
                                    '3.5 kW',
                                    '4.0 kW',
                                ]}
                                value={
                                    data.installation &&
                                    data.installation.indoorUnits &&
                                    data.installation.indoorUnits[i]
                                }
                                onChange={value =>
                                    onChange([
                                        {
                                            field:
                                                'installation.indoorUnits.' + i,
                                            value,
                                        },
                                    ])
                                }
                                errorText={errors.get(
                                    'installation.indoorUnits.' + i
                                )}
                            />
                        </InputField>
                    ))}
                {data.installation && data.installation.type === 'single' && (
                    <InputField>
                        <Select
                            width="400px"
                            label="Indoor Unit"
                            options={[
                                '2.0 kW',
                                '2.5 kW',
                                '3.0 kW',
                                '3.5 kW',
                                '4.0 kW',
                            ]}
                            value={
                                data.installation &&
                                data.installation.indoorUnits &&
                                data.installation.indoorUnits[0]
                            }
                            onChange={value =>
                                onChange([
                                    {
                                        field: 'installation.indoorUnits.0',
                                        value,
                                    },
                                ])
                            }
                            errorText={errors.get('installation.indoorUnits.0')}
                        />
                    </InputField>
                )}
            </Section>
        </React.Fragment>
    );
};

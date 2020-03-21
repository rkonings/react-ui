import React from 'react';
import * as Yup from 'yup';

import { Button } from '../../Button';
import TextButton from '../../Button/TextButton';
import { OnChangeHandler } from '../../Form';
import { Edit } from '../../Icon';
import Checkbox from '../../Input/Checkbox/Checkbox';
import Select from '../../Input/Select/Select';
import Switch from '../../Input/Switch/Switch';
import { Section, SettingsField } from '../../SettingsField';
import { ValidationErrors } from '../../Validation';
import { User } from '../Settings';

import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import { PopoverInput } from '../../CombinedInput/PopoverInput';
import PopupInput from '../../CombinedInput/PopupInput';
import TextField from '../../Input/TextField/TextField';

import { InputField } from '../../Form';

import { PopoverFooter } from '../../Popover/Popover';
import { PopupContent, PopupFooter, PopupHeader } from '../../Popup/Popup';
import { Offer } from '../OfferForm';

interface AssemblyInfo {
    data: Offer;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}

export default ({ data, onChange, errors, validationSchema }: AssemblyInfo) => {
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

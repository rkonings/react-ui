import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../../Button';
import TextButton from '../../Button/TextButton';
import { Edit } from '../../Icon';
import Checkbox from '../../Input/Checkbox/Checkbox';
import Select from '../../Input/Select/Select';
import Switch from '../../Input/Switch/Switch';
import { Section, SettingsField, Title } from '../../SettingsField';
import { OnChangeHandler, User, ValidationErrors } from './../Settings';

import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import { PopoverInput } from '../../CombinedInput/PopoverInput';
import TextField from '../../Input/TextField/TextField';

interface BasicInfo {
    user: User;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}

const InputField = styled.div`
    padding-bottom: 2em;

    ${TextField} {
        input {
            background: none;
        }
    }
`;

const PopoverFooter = styled.div`
    padding-top: 1em;
    display: flex;
    justify-content: flex-end;
`;

export default ({ user, onChange, errors, validationSchema }: BasicInfo) => {
    return (
        <React.Fragment>
            <Section>
                <PopoverInput<{ firstName: string; lastName: string }>
                    values={{
                        firstName: user.firstName,
                        lastName: user.lastName,
                    }}
                    link={() => (
                        <TextButton isIcon={true}>
                            <Edit />
                        </TextButton>
                    )}
                    validationSchema={validationSchema}
                    onChange={onChange}
                    errors={errors}
                    label={values => `${values.firstName} ${values.lastName}`}
                >
                    {({
                        setOpen,
                        errors,
                        values,
                        onChange,
                        onSave,
                        onCancel,
                    }) => (
                        <React.Fragment>
                            <InputField>
                                <TextField
                                    value={values.firstName}
                                    width="200px"
                                    placeHolder="Firstname"
                                    onChange={e =>
                                        onChange(
                                            'firstName',
                                            e.currentTarget.value
                                        )
                                    }
                                    errorText={errors.get('firstName')}
                                />
                            </InputField>
                            <InputField>
                                <TextField
                                    value={values.lastName}
                                    width="200px"
                                    placeHolder="LastName"
                                    onChange={e =>
                                        onChange(
                                            'lastName',
                                            e.currentTarget.value
                                        )
                                    }
                                    errorText={errors.get('lastName')}
                                />
                            </InputField>
                            <PopoverFooter>
                                <ButtonGroup>
                                    <TextButton onClick={() => onCancel()}>
                                        Cancel
                                    </TextButton>
                                    <Button
                                        onClick={() => onSave()}
                                        type="primary"
                                    >
                                        Save
                                    </Button>
                                </ButtonGroup>
                            </PopoverFooter>
                        </React.Fragment>
                    )}
                </PopoverInput>
                <InputField>
                    <Select
                        width="400px"
                        label="Language"
                        options={['Netherlands', 'UK']}
                        value={user.settings.language}
                        onChange={value =>
                            onChange([{ field: 'settings.language', value }])
                        }
                        errorText={errors.get('settings.language')}
                    />
                </InputField>
                <InputField>
                    <Select
                        width="400px"
                        label="Date &amp; number format"
                        options={['Netherlands', 'UK']}
                        value={user.settings.dateFormat}
                        helperText="Format: 4 december 2019, 04-12-2019, and 1.234,56"
                        onChange={value =>
                            onChange([{ field: 'settings.dateFormat', value }])
                        }
                        errorText={errors.get('settings.dateFormat')}
                    />
                </InputField>
            </Section>
            <Section>
                <SettingsField
                    label="Enable push notifications"
                    description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
                    input={
                        <Checkbox
                            onChange={value =>
                                onChange([
                                    {
                                        field: 'settings.pushNotifications',
                                        value,
                                    },
                                ])
                            }
                            checked={user.settings.pushNotifications}
                            size="xl"
                        />
                    }
                />
                <SettingsField
                    label="Include a link to unscribe to all email"
                    description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
                    input={
                        <Switch
                            checked={user.settings.unscribeEmailLink}
                            onChange={value =>
                                onChange([
                                    {
                                        field: 'settings.unscribeEmailLink',
                                        value,
                                    },
                                ])
                            }
                        />
                    }
                />
                <SettingsField
                    label="Signature"
                    input={<Button>Edit</Button>}
                />
            </Section>
        </React.Fragment>
    );
};

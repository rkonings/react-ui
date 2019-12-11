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
import { User } from './../Settings';

import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import { PopoverInput } from '../../CombinedInput/PopoverInput';
import PopupInput from '../../CombinedInput/PopupInput';
import TextField from '../../Input/TextField/TextField';

import { InputField } from '../../Form';

import { PopoverFooter } from '../../Popover/Popover';
import { PopupContent, PopupFooter, PopupHeader } from '../../Popup/Popup';

interface BasicInfo {
    user: User;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}

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
                    label="Security"
                    description="Change your e-mail address"
                    input={
                        <PopupInput<{ email: string }>
                            link={<Button>Change</Button>}
                            onChange={onChange}
                            validationSchema={validationSchema}
                            values={{
                                email: user.email,
                            }}
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
                                    <PopupHeader>
                                        Change email address
                                    </PopupHeader>
                                    <PopupContent>
                                        <InputField>
                                            <TextField
                                                value={values.email}
                                                width="200px"
                                                inputType="email"
                                                onChange={e =>
                                                    onChange(
                                                        'email',
                                                        e.currentTarget.value
                                                    )
                                                }
                                                errorText={errors.get('email')}
                                            />
                                        </InputField>
                                    </PopupContent>
                                    <PopupFooter>
                                        <ButtonGroup>
                                            <TextButton
                                                onClick={() => onCancel()}
                                            >
                                                cancel
                                            </TextButton>
                                            <Button
                                                type="primary"
                                                onClick={() => onSave()}
                                            >
                                                Save
                                            </Button>
                                        </ButtonGroup>
                                    </PopupFooter>
                                </React.Fragment>
                            )}
                        </PopupInput>
                    }
                />
            </Section>
        </React.Fragment>
    );
};

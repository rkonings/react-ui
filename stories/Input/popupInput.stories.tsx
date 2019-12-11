import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import React from 'react';
import * as Yup from 'yup';
import Button from '../../src/Button/Button';
import TextButton from '../../src/Button/TextButton';
import ButtonGroup from '../../src/ButtonGroup/ButtonGroup';
import TextField from '../../src/Input/TextField/TextField';

import styled from 'styled-components';
import PopupInput from '../../src/CombinedInput/PopupInput';
import { PopupContent, PopupFooter, PopupHeader } from '../../src/Popup/Popup';

const InputField = styled.div`
    padding-bottom: 2em;
    ${TextField} {
        input {
            background: none;
        }
    }
`;

storiesOf('Input/Popup', module)
    .add('default', () => {
        const values = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        };

        const validationSchema = Yup.object({
            firstName: Yup.string().required('is required'),
            lastName: Yup.string().required('field is required'),
        });

        return (
            <PopupInput
                link={<Button>Popup</Button>}
                onChange={(values, options, cb) => {
                    cb();
                    action('onChange')(values, options);
                }}
                validationSchema={validationSchema}
                values={values}
            >
                {({ setOpen, errors, values, onChange, onSave, onCancel }) => (
                    <React.Fragment>
                        <PopupHeader>Store client</PopupHeader>
                        <PopupContent>
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
                        </PopupContent>
                        <PopupFooter>
                            <ButtonGroup>
                                <TextButton onClick={() => onCancel()}>
                                    cancel
                                </TextButton>
                                <Button type="primary" onClick={() => onSave()}>
                                    Save
                                </Button>
                            </ButtonGroup>
                        </PopupFooter>
                    </React.Fragment>
                )}
            </PopupInput>
        );
    })
    .add('no button', () => {
        const isOpen = boolean('isOpen', true);
        const values = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        };

        const validationSchema = Yup.object({
            firstName: Yup.string().required('is required'),
            lastName: Yup.string().required('field is required'),
        });

        return (
            <PopupInput
                isOpen={isOpen}
                onChange={(values, options, cb) => {
                    cb();
                    action('onChange')(values, options);
                }}
                validationSchema={validationSchema}
                values={values}
            >
                {({ setOpen, errors, values, onChange, onSave, onCancel }) => (
                    <React.Fragment>
                        <PopupHeader>Store client</PopupHeader>
                        <PopupContent>
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
                        </PopupContent>
                        <PopupFooter>
                            <ButtonGroup>
                                <TextButton onClick={() => onCancel()}>
                                    cancel
                                </TextButton>
                                <Button type="primary" onClick={() => onSave()}>
                                    Save
                                </Button>
                            </ButtonGroup>
                        </PopupFooter>
                    </React.Fragment>
                )}
            </PopupInput>
        );
    });

import React from 'react';
import * as Yup from 'yup';
import {action} from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import faker from 'faker';

import {PopoverInput} from '../../src/CombinedInput/PopoverInput';
import ButtonGroup from '../../src/ButtonGroup/ButtonGroup';
import {TextButton, Button } from '../../src/Button';
import TextField from '../../src/Input/TextField/TextField';
import { Edit } from '../../src/Icon';

storiesOf('Input/Popover Input', module)
.add('default', () => {

    const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('is required'),
        lastName: Yup.string().required('field is required'),
      });

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

    return (
        <PopoverInput<{ firstName: string; lastName: string }>
          values={{
            firstName: user.firstName,
            lastName: user.lastName
          }}
          link={() => <TextButton isIcon={true}><Edit /></TextButton>}
          validationSchema={validationSchema}
          onChange={(values, options, cb) => {
              cb();
              action('onChange')(values, options);
        }}
          label={(values) => `${values.firstName} ${values.lastName}`}
        >
          {({ setOpen, errors, values, onChange, onSave, onCancel }) => (
            <React.Fragment>
              <InputField>
                <TextField
                  value={values.firstName}
                  width="200px"
                  placeHolder="Firstname"
                  onChange={e => onChange('firstName', e.currentTarget.value)}
                  errorText={errors.get('firstName')}
                />
              </InputField>
              <InputField>
                <TextField
                  value={values.lastName}
                  width="200px"
                  placeHolder="LastName"
                  onChange={e => onChange('lastName', e.currentTarget.value)}
                  errorText={errors.get('lastName')}
                />
              </InputField>
              <PopoverFooter>
                <ButtonGroup>
                  <TextButton onClick={() => onCancel()}>Cancel</TextButton>
                  <Button onClick={() => onSave()} type="primary">
                    Save
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </React.Fragment>
          )}
        </PopoverInput>
    )
})
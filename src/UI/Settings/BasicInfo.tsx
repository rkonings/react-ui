import React from 'react';
import styled from 'styled-components';

import { Section, SettingsField, Title } from '../../SettingsField';
import Checkbox from '../../Input/Checkbox/Checkbox';
import Select from '../../Input/Select/Select';
import Switch from '../../Input/Switch/Switch';
import { Button } from '../../Button';
import TextButton from '../../Button/TextButton';
import { Edit } from '../../Icon';
import { User, ValidationErrors } from './../Settings';

import ButtonGroup from '../../ButtonGroup/ButtonGroup';

import Popover from '../../Popover/Popover';

import TextField from '../../Input/TextField/TextField';

interface BasicInfo {
  user: User;
  onChange: (field: string, value: string | boolean | number) => void;
  errors: ValidationErrors;
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

const EditableWithPopover = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    font-size: 24px;
    font-weight: 200;
`;

export default ({user, onChange, errors}: BasicInfo) => {
  return (
    <React.Fragment>
      <Section>
        <EditableWithPopover>
            {`${user.firstName} ${user.lastName}`}
          <Popover link={<TextButton isIcon={true}><Edit /></TextButton>}>
            {setOpen => (
              <React.Fragment>
                <InputField>
                  <TextField
                    value={user.firstName}
                    width="200px"
                    placeHolder="Firstname"
                    onChange={(e) => onChange('firstName', e.currentTarget.value)}
                    errorText={errors.get('firstName')}
                  />
                </InputField>
                <InputField>
                  <TextField
                    value={user.lastName}
                    width="200px"
                    placeHolder="LastName"
                    onChange={(e) => onChange('lastName', e.currentTarget.value)}
                    errorText={errors.get('lastName')}
                  />
                </InputField>
                <PopoverFooter>
                  <ButtonGroup>
                    <TextButton onClick={() => setOpen(false)}>
                      Cancel
                    </TextButton>
                    <Button onClick={() => setOpen(false)} type="primary">
                      Save
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </React.Fragment>
            )}
          </Popover>
        </EditableWithPopover>
        <InputField>
                <Select
                  width="400px"
                  label="Language"
                  options={['Netherlands', 'UK']}
                  value={user.settings.language}
                  onChange={(value) => onChange('settings.language', value)}
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
                  onChange={(value) => onChange('settings.dateFormat', value)}
                  errorText={errors.get('settings.dateFormat')}
                />
        </InputField>
      </Section>
      <Section>
        <Title>Cliens</Title>
        <SettingsField
          label="Enable push notifications"
          description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
          input={(
            <Checkbox
              onChange={(value) => onChange('settings.pushNotifications', value)}
              checked={user.settings.pushNotifications}
              size="xl"
            />
          )}
        />
        <SettingsField
          label="Include a link to unscribe to all email"
          description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
          input={(
            <Switch
              checked={user.settings.unscribeEmailLink}
              onChange={(value) => onChange('settings.unscribeEmailLink', value)}
            />
          )}
        />
        <SettingsField label="Signature" input={<Button>Edit</Button>} />
      </Section>
    </React.Fragment>
  );
};

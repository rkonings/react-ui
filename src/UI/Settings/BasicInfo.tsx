import React from 'react';
import styled from 'styled-components';

import { Section, SettingsField, Title } from '../../SettingsField';
import Checkbox from '../../Input/Checkbox/Checkbox';
import Select from '../../Input/Select/Select';
import Switch from '../../Input/Switch/Switch';
import { Button } from '../../Button';
import TextButton from '../../Button/TextButton';
import { Edit } from '../../Icon';

import ButtonGroup from '../../ButtonGroup/ButtonGroup';

import Popover from '../../Popover/Popover';

import TextField from '../../Input/TextField/TextField';

const InputField = styled.div`
  padding-bottom: 10px;

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
    padding-bottom: 10px;
`;

export default () => {
  return (
    <React.Fragment>
      <Section>
        <Title>Basic information</Title>
        <EditableWithPopover>
            Randy Konings
          <Popover link={<TextButton isIcon={true}><Edit /></TextButton>}>
            {setOpen => (
              <React.Fragment>
                <InputField>
                  <TextField width="200px" placeHolder="Firstname" />
                </InputField>
                <InputField>
                  <TextField width="200px" placeHolder="LastName" />
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
                <Select options={['Netherlands', 'UK']} />
        </InputField>
        <InputField>
                <Select options={['Netherlands', 'UK']} />
        </InputField>
      </Section>
      <Section>
        <Title>Cliens</Title>
        <SettingsField
          label="Enable push notifications"
          description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
          input={<Checkbox size="xl" />}
        />
        <SettingsField
          label="Include a link to unscribe to all email"
          description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
          input={<Switch />}
        />
        <SettingsField label="Signature" input={<Button>Edit</Button>} />
      </Section>
    </React.Fragment>
  );
};

import React from 'react';
import styled from 'styled-components';

import { Button } from '../../Button';
import Checkbox from '../../Input/Checkbox/Checkbox';
import Switch from '../../Input/Switch/Switch';
import { Section, SettingsField, Title } from '../../SettingsField';
import Tab, { TabContent } from '../../Tab/Tab';

import ButtonGroup from '../../ButtonGroup/ButtonGroup';

import TextButton from '../../Button/TextButton';
import TextField from '../../Input/TextField/TextField';
import Popover from '../../Popover/Popover';

const InputControl = styled.div`
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

export default () => (
    <Tab active="clients">
        <TabContent id="clients" label="Clients">
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
                <SettingsField
                    label="Signature"
                    input={<Button>Edit</Button>}
                />
            </Section>
        </TabContent>
        <TabContent id="companies" label="Companies">
            <Section>
                <Title>Companies</Title>
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
                <SettingsField
                    label="Signature"
                    input={<Button>Edit</Button>}
                />
            </Section>
        </TabContent>
        <TabContent id="privacy" label="Privacy">
            <Section>
                <Title>Privacy</Title>
                <SettingsField
                    label="Your firstname &amp; lastname"
                    description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
                    input={<Checkbox size="xl" />}
                />
                <SettingsField
                    label="Include a link to unscribe to all email"
                    description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
                    input={<Switch />}
                />
                <SettingsField
                    label="Signature"
                    input={
                        <Popover link={<Button>edit</Button>}>
                            {setOpen => (
                                <React.Fragment>
                                    <InputControl>
                                        <TextField
                                            width="200px"
                                            placeHolder="Firstname"
                                        />
                                    </InputControl>
                                    <InputControl>
                                        <TextField
                                            width="200px"
                                            placeHolder="LastName"
                                        />
                                    </InputControl>
                                    <PopoverFooter>
                                        <ButtonGroup>
                                            <TextButton
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </TextButton>
                                            <Button
                                                onClick={() => setOpen(false)}
                                                type="primary"
                                            >
                                                Save
                                            </Button>
                                        </ButtonGroup>
                                    </PopoverFooter>
                                </React.Fragment>
                            )}
                        </Popover>
                    }
                />
            </Section>
        </TabContent>
    </Tab>
);

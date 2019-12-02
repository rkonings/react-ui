import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { select } from '@storybook/addon-knobs';

import Tab, { TabContent } from '../src/Tab/Tab';
import {Button} from '../src/Button';
import Checkbox from '../src/Input/Checkbox/Checkbox';
import Select from '../src/Input/Select/Select';
import Switch from '../src/Input/Switch/Switch';
import { Section, SettingsField, Title } from '../src/SettingsField';

const Wrapper = styled.div`
    width: 60%;
`;

storiesOf('Tabs', module)
.add('default', () => {
    const activeTabId = select('activeTabId', ['tab-1', 'tab-2', 'tab-3'], 'tab-1');
    return (
        <Wrapper>
            <Tab active={activeTabId}>
                <TabContent id="tab-1" label="Clients">
                    <Section>
                        <Title>General</Title>
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
                <TabContent id="tab-2" label="Companies">
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
                <TabContent id="tab-3" label="Profile">
                    <Section>
                        <Title>Profile</Title>
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
                            input={<Button>Edit</Button>}
                        />
                    </Section>
                </TabContent>
            </Tab>
        </Wrapper>
    );
});

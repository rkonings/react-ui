import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Button} from '../src/Button';
import Checkbox from '../src/Input/Checkbox/Checkbox';
import Select from '../src/Input/Select/Select';
import Switch from '../src/Input/Switch/Switch';
import { Section, SettingsField, Title } from '../src/SettingsField';

const Wrapper = styled.div`
    width: 60%;
`;

storiesOf('SettingsField', module)
.add('default', () => {
    return (
        <Wrapper>
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
                <SettingsField
                    label="Include a link to unscribe to all email"
                    description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
                    input={<Select size="s" options={['option 1', 'option 2']} />}
                />
                <SettingsField
                    label="Include a link to unscribe to all email"
                    description="Include a link at the bottom of your emails allowing recipients to unsubscribe. It will help you stay compliant with local spam laws and improve deliverability."
                    input={<Button type="secondairy">Edit</Button>}
                />
            </Section>
        </Wrapper>
    );
});

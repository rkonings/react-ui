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
                <Title>Clients</Title>
                <SettingsField
                    label="Set the properties your team sees on clients records."
                    description="Choose the properties that will be displayed on all contact records for all users in your CRM."
                    input={<Checkbox size="xl" />}
                />
                <SettingsField
                    label="Set the properties all users in your account see when creating contacts."
                    description="Choose the properties that will be displayed when any user in your CRM creates a contact, and which of those properties are required in order to create a contact."
                    input={<Switch />}
                />
                <SettingsField
                    label="Assign company owner to contact by default."
                    description="Any contact added to a company will have the same company owner. If a contact's owner is changed, this won't change the company owner unless the company's owner is blank."
                    input={<Switch />}
                />
            </Section>
        </TabContent>
        <TabContent id="companies" label="Companies">
            <Section>
                <Title>Companies</Title>
                <SettingsField
                    label="Set the properties your team sees on company records."
                    description="Choose the properties that will be displayed on all company records for all users in your CRM."
                    input={<Checkbox size="xl" />}
                />
                <SettingsField
                    label="Set the properties your team sees when creating companies."
                    description="Choose the properties that will be displayed when any user in your CRM creates a company, and which of those properties are required in order to create a company."
                    input={<Switch />}
                />
                <SettingsField
                    label="Lifecycle stage sync"
                    description="When a company's lifecycle stage changes, sync this lifecycle stage to all associated contacts."
                    input={<Button>Edit</Button>}
                />
            </Section>
        </TabContent>
        <TabContent id="privacy" label="Privacy">
            <Section>
                <Title>Data privacy &amp; consent options</Title>
                <SettingsField
                    label="Legitimate interest"
                    description="RandyKonings heeft de door jou verstrekte contactgegevens nodig om contact met je op te nemen over onze producten en diensten. Je kunt je op elk moment afmelden voor deze berichten. Bekijk ons privacybeleid voor meer informatie over hoe je je af kan melden, onze privacypraktijken en hoe we ons inzetten om je privacy te beschermen en respecteren."
                    input={<Checkbox size="xl" />}
                />
                <SettingsField
                    label="Privacy policy"
                    description="Je kunt je op elk moment afmelden voor deze berichten. Bekijk ons privacybeleid voor meer informatie over hoe je af te melden, onze privacypraktijken en hoe we ons inzetten om je privacy te beschermen en respecteren."
                    input={<Switch />}
                />
                <SettingsField
                    label="Consent to communicate"
                    input={<Switch />}
                    description="RandyKonings is toegewijd aan het beschermen en respecteren van je privacy, en we zullen je persoonlijke informatie alleen gebruiken om je account te beheren en om de producten en diensten te leveren waar je ons om hebt gevraagd. Van tijd tot tijd willen wij contact met je opnemen over onze producten en diensten, en andere inhoud die je interessant zou kunnen vinden. Als je ermee instemt dat wij contact met je opnemen, vink dan hieronder aan hoe je wilt dat wij contact met je opnemen"
                />
            </Section>
        </TabContent>
    </Tab>
);

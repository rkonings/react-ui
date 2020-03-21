import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../../Button';
import TextButton from '../../Button/TextButton';
import { OnChangeHandler } from '../../Form';
import { Edit } from '../../Icon';
import Checkbox from '../../Input/Checkbox/Checkbox';
import Select from '../../Input/Select/Select';
import Switch from '../../Input/Switch/Switch';
import { Section, SettingsField, Title } from '../../SettingsField';
import { ValidationErrors } from '../../Validation';
import { User } from './../Settings';

import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import { PopoverInput } from '../../CombinedInput/PopoverInput';
import PopupInput from '../../CombinedInput/PopupInput';
import TextField from '../../Input/TextField/TextField';

import { InputField } from '../../Form';

import { PopoverFooter } from '../../Popover/Popover';
import { PopupContent, PopupFooter, PopupHeader } from '../../Popup/Popup';
import { Offer } from '../OfferForm';

interface OfferInfo {
    data: Offer;
    onChange: OnChangeHandler;
    errors: ValidationErrors;
    validationSchema: Yup.ObjectSchema;
}
interface Item {
    className?: string;
    label: string;
    value?: string | number;
    measureUnit?: string;
}

const ItemSection = styled.div`
    margin: 1em 0 2em 0;
    width: 600px;
    box-sizing: border-box;
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    background: ${({ theme: { color } }) => color.gray10};
`;

const ItemSectionTitle = styled.div`
    font-size: 120%;
    margin-bottom: 0.5em;

    width: 100%;
`;

const ItemLabel = styled.div`
    margin-right: 2em;
    width: 100px;
    font-size: 80%;
    font-weight: 400;
    width: 100%;
`;
const ItemValue = styled.div``;
const ItemPostFix = styled.div`
    padding-left: 5px;
`;

const ItemSectionCol = styled.div`
    width: 45%;
`;

const Item = styled(({ className, label, value, measureUnit }: Item) => (
    <div className={className}>
        <ItemLabel>{label}</ItemLabel>
        <ItemValue>{value}</ItemValue>
        {measureUnit && <ItemPostFix>{measureUnit}</ItemPostFix>}
    </div>
))`
    line-height: 1.2em;
    margin-bottom: 1em;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
`;

export default ({ data, onChange, errors, validationSchema }: OfferInfo) => {
    return (
        <React.Fragment>
            <Section>
                <ItemSection>
                    <ItemSectionCol>
                        <Item label="Offer type" value={data.type} />
                        <Item label="Client" value={data.client} />
                        <Item label="User" value={data.user} />
                    </ItemSectionCol>

                    <ItemSectionCol>
                        <Item label="Date" value={data.date} />
                        <Item
                            label="Expiration"
                            value={data.expiration}
                            measureUnit="days"
                        />
                        <Item label="Reference" value={data.reference} />
                    </ItemSectionCol>
                </ItemSection>

                <ItemSection>
                    <ItemSectionTitle>Unit</ItemSectionTitle>
                    <Item
                        label="Type"
                        value={data.installation && data.installation.type}
                    />
                    <Item
                        label="Outdoor unit"
                        value={
                            data.installation &&
                            data.installation.outdoorUnits &&
                            data.installation.outdoorUnits[0]
                        }
                    />
                    <Item
                        label="Indoor unit"
                        value={
                            data.installation &&
                            data.installation.indoorUnits &&
                            data.installation.indoorUnits[0]
                        }
                    />
                </ItemSection>

                <ItemSection>
                    <ItemSectionTitle>Installation</ItemSectionTitle>
                    <Item
                        label="Drill holes"
                        value={
                            data.installation &&
                            data.installation.amountDrillHoles
                        }
                    />
                    <Item
                        label="Cooling pipe"
                        value={
                            data.installation && data.installation.coolingPipe
                        }
                        measureUnit="m"
                    />
                    <Item
                        label="Wall bracket"
                        value={
                            data.installation &&
                            data.installation.mounting &&
                            data.installation.mounting.wallBracket
                        }
                    />
                </ItemSection>

                <ItemSection>
                    <ItemSectionTitle>Electricity</ItemSectionTitle>
                    <Item
                        label="Communiation cable"
                        value={
                            data.installation &&
                            data.installation.electricity &&
                            data.installation.electricity.communication
                        }
                        measureUnit="m"
                    />
                    <Item
                        label="Controle cable"
                        value={
                            data.installation &&
                            data.installation.electricity &&
                            data.installation.electricity.control
                        }
                        measureUnit="m"
                    />
                    <Item
                        label="Power cable"
                        value={
                            data.installation &&
                            data.installation.electricity &&
                            data.installation.electricity.power
                        }
                        measureUnit="m"
                    />
                    <Item
                        label="Power group"
                        value={
                            data.installation &&
                            data.installation.electricity &&
                            data.installation.electricity.powerGroup
                        }
                    />
                </ItemSection>

                <ItemSection>
                    <ItemSectionTitle>Assembly</ItemSectionTitle>
                    <Item
                        label="Assembly"
                        value={
                            data.assemblyHours && data.assemblyHours.assembly
                        }
                        measureUnit="hours"
                    />
                    <Item
                        label="Electricity"
                        value={
                            data.assemblyHours && data.assemblyHours.electricity
                        }
                        measureUnit="hours"
                    />
                    <Item
                        label="Refrigeration"
                        value={
                            data.assemblyHours &&
                            data.assemblyHours.refrigeration
                        }
                        measureUnit="hours"
                    />
                </ItemSection>

                <ButtonGroup>
                    <TextButton>Send</TextButton>
                    <Button type="primary">Save</Button>
                </ButtonGroup>
            </Section>
        </React.Fragment>
    );
};

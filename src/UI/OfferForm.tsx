import dotProp from 'dot-prop';
import React from 'react';
import styled from 'styled-components';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ChangedItems, ChangeOptions } from '../Form';
import { Navigation, NavigationItem } from '../Navigation';
import { ValidationErrors, Yup } from '../Validation';
import BasicInfo from './OfferForm/BasicInfo';
import InstallationInfo from './OfferForm/InstallationInfo';
import ElectricityInfo from './OfferForm/ElectricityInfo';
import AssemblyInfo from './OfferForm/AssemblyInfo';
import OfferInfo from './OfferForm/OfferInfo';
import UnitInfo from './OfferForm/UnitInfo';
import ContactsCompanies from './Settings/ContactsCompanies';
import { string } from 'yup';

export interface User {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export interface Client {
    firstName: string;
    lastName: string;
    email: string;
}

export interface Pump {
    type: string;
    amount: number;
}

export interface Electricity {
    power: number;
    control: number;
    communication: number;
    powerGroup?: string;
}

export interface Mounting {
    sidebars?: string;
    roofTerminal?: string;
    wallBracket?: string;
}

export interface AssemblyHours {
    electricity: number;
    refrigeration: number;
    assembly: number;
}

export interface Installation {
    type: string;
    outdoorUnits: string[];
    indoorUnits: string[];
    coolingPipe: number;
    pump: Pump;
    mounting: Mounting;
    amountDrillHoles: number;
    electricity: Electricity;
}

export interface Offer {
    id?: string;
    type: string;
    reference: string;
    date: string;
    expiration?: number;
    // user?: User;
    user?: string;
    // client?: Client;
    client?: string;
    installation?: Installation;
    assemblyHours?: AssemblyHours;
}

const OfferSchema = Yup.object({
    id: Yup.string(),
    type: Yup.string().required(),
    reference: Yup.string().required('field is required'),
    date: Yup.string().required('password is required'),
    expiration: Yup.string(),
    user: Yup.string().required(),
    client: Yup.string(),
    // user: Yup.object({
    //     firstName: Yup.string().required('is required'),
    //     lastName: Yup.string().required('is required'),
    //     phone: Yup.string().required('is required'),
    //     email: Yup.string().required('is required'),
    // }),
    // client: Yup.object({
    //     firstName: Yup.string().required('is required'),
    //     lastName: Yup.string().required('is required'),
    //     email: Yup.string().required('is required'),
    // }),
    installation: Yup.object({
        type: Yup.string().required('is required'),
        outdoorUnits: Yup.array().of(Yup.string().required()),
        indoorUnits: Yup.array().of(Yup.string().required()),
        coolingPipe: Yup.number().required('is required'),
        pump: Yup.object({
            type: Yup.string().required(),
            amount: Yup.number().required(),
        }),
        mounting: Yup.object({
            sidebars: Yup.string(),
            roofTerminal: Yup.string(),
            wallBracket: Yup.string(),
        }),
        amountDrillHoles: Yup.number(),
    }),
    assemblyHours: Yup.object({
        electricity: Yup.number().required('is required'),
        refrigeration: Yup.number().required('is required'),
        assembly: Yup.number().required('is required'),
    }),
});

interface Settings {
    className?: string;
    offer: Offer;
    onChange: (props: { offer: Offer }) => void;
}

const Nav = styled.div`
    display: block;
    margin-bottom: 50px;
    margin-right: 2em;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`;

const Content = styled.div``;

export const mapValidationErrors = (error: Yup.ValidationError) => {
    if (error.inner.length > 0) {
        return error.inner.reduce(
            (obj: ValidationErrors, item: Yup.ValidationError) => {
                return obj.set(item.path, item.message);
            },
            new Map()
        );
    } else {
        const errorsMap = new Map<string, string>();
        errorsMap.set(error.path, error.message);
        return errorsMap;
    }
};

const OfferForm = ({ className, offer, onChange }: Settings) => {
    const [data, setData] = React.useState<Offer>(offer);
    const [errors, setErrors] = React.useState<ValidationErrors>(new Map());
    const history = useHistory();
    const { pathname } = useLocation();

    const onChangeHandler = async (
        items: ChangedItems,
        options?: ChangeOptions,
        callBack?: () => void
    ) => {
        const newOffer = { ...data };
        items.forEach(item => dotProp.set(newOffer, item.field, item.value));
        setData(newOffer);

        if (options && options.saveFields) {
            onChange({ offer: newOffer });
            if (callBack) {
                callBack();
            }
            return;
        }

        OfferSchema.validate(newOffer, { abortEarly: false })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setErrors(errors);
            })
            .then(() => {
                onChange({ offer: newOffer });
            });
    };

    return (
        <div className={className}>
            <Nav>
                <Navigation>
                    <NavigationItem
                        isActive={pathname === '/'}
                        onClick={() => history.push('/')}
                    >
                        Basic
                    </NavigationItem>
                    <NavigationItem
                        isActive={pathname === '/unit-info'}
                        onClick={() => history.push('/unit-info')}
                    >
                        Unit
                    </NavigationItem>
                    <NavigationItem
                        isActive={pathname === '/installation-info'}
                        onClick={() => history.push('/installation-info')}
                    >
                        Installation
                    </NavigationItem>
                    <NavigationItem
                        isActive={pathname === '/electricity-info'}
                        onClick={() => history.push('/electricity-info')}
                    >
                        Electricity
                    </NavigationItem>
                    <NavigationItem
                        isActive={pathname === '/assembly-info'}
                        onClick={() => history.push('/assembly-info')}
                    >
                        Assembly
                    </NavigationItem>
                    <NavigationItem
                        isActive={pathname === '/offer-info'}
                        onClick={() => history.push('/offer-info')}
                    >
                        Offer
                    </NavigationItem>
                </Navigation>
            </Nav>
            <Content>
                <Switch>
                    {/* <Route
                        path="/contacts-companies"
                        render={() => <ContactsCompanies />}
                    /> */}
                    <Route
                        path="/unit-info"
                        render={() => (
                            <UnitInfo
                                validationSchema={OfferSchema}
                                onChange={onChangeHandler}
                                data={data}
                                errors={errors}
                            />
                        )}
                    />
                    <Route
                        path="/installation-info"
                        render={() => (
                            <InstallationInfo
                                validationSchema={OfferSchema}
                                onChange={onChangeHandler}
                                data={data}
                                errors={errors}
                            />
                        )}
                    />
                    <Route
                        path="/electricity-info"
                        render={() => (
                            <ElectricityInfo
                                validationSchema={OfferSchema}
                                onChange={onChangeHandler}
                                data={data}
                                errors={errors}
                            />
                        )}
                    />
                    <Route
                        path="/assembly-info"
                        render={() => (
                            <AssemblyInfo
                                validationSchema={OfferSchema}
                                onChange={onChangeHandler}
                                data={data}
                                errors={errors}
                            />
                        )}
                    />
                    <Route
                        path="/offer-info"
                        render={() => (
                            <OfferInfo
                                validationSchema={OfferSchema}
                                onChange={onChangeHandler}
                                data={data}
                                errors={errors}
                            />
                        )}
                    />
                    <Route
                        path="/"
                        render={() => (
                            <BasicInfo
                                validationSchema={OfferSchema}
                                onChange={onChangeHandler}
                                data={data}
                                errors={errors}
                            />
                        )}
                    />
                </Switch>
            </Content>
        </div>
    );
};

export default styled(OfferForm)`
    padding: 2em;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: scroll;
    flex-direction: row;
`;

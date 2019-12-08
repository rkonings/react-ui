import dotProp from 'dot-prop';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Navigation, NavigationItem } from '../Navigation';
import BasicInfo from './Settings/BasicInfo';
import ContactsCompanies from './Settings/ContactsCompanies';

export interface UserSettings {
    language: string;
    dateFormat: string;
    pushNotifications: boolean;
    unscribeEmailLink: boolean;
    signature: string;
}

export interface User {
    firstName: string;
    lastName: string;
    settings: UserSettings;
    password: string;
    email: string;
}

export type ValidationErrors = Map<string, string>;
export interface ChangedItem {
    field: string;
    value: string | boolean | number;
}

export interface ChangeOptions {
    saveFields?: boolean;
}
export type ChangedItems = ChangedItem[];
export type OnChangeHandler = (
    items: ChangedItems,
    options?: ChangeOptions,
    callBack?: () => void
) => void;

const UserSchema = Yup.object({
    firstName: Yup.string().required('is required'),
    lastName: Yup.string().required('field is required'),
    password: Yup.string().required('password is required'),
    email: Yup.string().required('email is required'),
    settings: Yup.object({
        language: Yup.string().required('is required'),
        dateFormat: Yup.string().required('is required'),
        pushNotifications: Yup.boolean().required('is required'),
        signature: Yup.string().max(10),
    }),
});

interface Settings {
    className?: string;
    user: User;
    onChange: (props: {
        user: User;
        newUser: User;
        changed: ChangedItems;
    }) => void;
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

const Settings = ({ className, user, onChange }: Settings) => {
    const [data, setData] = React.useState<User>(user);
    const [errors, setErrors] = React.useState<ValidationErrors>(new Map());
    const history = useHistory();
    const { pathname } = useLocation();

    const onChangeHandler = async (
        items: ChangedItems,
        options?: ChangeOptions,
        callBack?: () => void
    ) => {
        const newUser = { ...data };
        items.forEach(item => dotProp.set(newUser, item.field, item.value));
        setData(newUser);

        if (options && options.saveFields) {
            onChange({ newUser, changed: items, user });
            if (callBack) {
                callBack();
            }
            return;
        }

        UserSchema.validate(newUser, { abortEarly: false })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setErrors(errors);
            })
            .then(() => {
                onChange({ newUser, changed: items, user });
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
                        Basic infomation
                    </NavigationItem>
                    <NavigationItem
                        isActive={pathname === '/contacts-companies'}
                        onClick={() => history.push('/contacts-companies')}
                    >
                        Clients &amp; Companies
                    </NavigationItem>
                </Navigation>
            </Nav>
            <Content>
                <Switch>
                    <Route
                        path="/contacts-companies"
                        render={() => <ContactsCompanies />}
                    />
                    <Route
                        path="/"
                        render={() => (
                            <BasicInfo
                                validationSchema={UserSchema}
                                onChange={onChangeHandler}
                                user={data}
                                errors={errors}
                            />
                        )}
                    />
                </Switch>
            </Content>
        </div>
    );
};

export default styled(Settings)`
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

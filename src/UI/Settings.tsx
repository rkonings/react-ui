import dotProp from 'dot-prop';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Route, Link, Switch } from 'react-router-dom';
import BasicInfo from './Settings/BasicInfo';
import ContactsCompanies from './Settings/ContactsCompanies';

export interface UserSettings {
  language: string;
  dateFormat: string;
  pushNotifications: boolean;
  unscribeEmailLink: boolean;
  signature: string;
}

export type ValidationErrors = Map<string, string>;

export interface User {
  firstName: string;
  lastName: string;
  settings: UserSettings;
}

const UserSchema = Yup.object({
  firstName: Yup.string().required('is required'),
  lastName: Yup.string().required('field is required'),
  settings: Yup.object({
    language: Yup.string().required('is required'),
    dateFormat: Yup.string().required('is required'),
    pushNotifications: Yup.boolean().required('is required'),
    signature: Yup.string().max(10)
  })

});

interface Settings {
  className?: string;
  user: User;
}

const Nav = styled.div`
  display: block;
  margin-bottom: 50px;
  margin-right: 2em;
  ul {
    list-style: none;
    margin:0;
    padding:0;
  }
`;

const Content = styled.div``;

const mapValidationErrors = (error: Yup.ValidationError) => {
  return error.inner.reduce((obj: ValidationErrors, item: Yup.ValidationError) => {
    return obj.set(item.path, item.message);
  }, new Map());
}

const Settings = ({ className, user }: Settings) => {

  const [ data, setData ] = React.useState<User>(user);
  const [ errors, setErrors ] = React.useState<ValidationErrors>(new Map());

  const onChange = async (field: string, value: string | boolean | number) => {
    const user = {...data};
    dotProp.set(user, field, value);
    setData(user);

    UserSchema.validate(user, {abortEarly: false})
    .catch((error) => {
      const errors = mapValidationErrors(error);
      setErrors(errors);
    });

  };

  return (
    <div className={className}>
      <Nav>
        <ul>
        <li>
          <Link to="/basic">BasicInfo</Link>
        </li>
        <li>
          <Link to="/contacts-companies">Clients &amp; Companies</Link>
        </li>
        </ul>
      </Nav>
      <Content>
        <Switch>
          <Route path="/basic" render={() => <BasicInfo onChange={onChange} user={data} errors={errors} />} />
          <Route path="/contacts-companies" render={() => <ContactsCompanies />} />
          <Route path="/" render={() => <BasicInfo onChange={onChange} user={data} errors={errors} />} />
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

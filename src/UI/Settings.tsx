import React from 'react';
import styled from 'styled-components';
import ContactsCompanies from './Settings/ContactsCompanies';
import BasicInfo from './Settings/BasicInfo';
import { Route, Link, Switch } from 'react-router-dom';

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
}

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

const Settings = ({ className, user }: Settings) => {
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
          <Route path="/basic" render={() => <BasicInfo user={user} />} />
          <Route path="/contacts-companies" render={() => <ContactsCompanies />} />
          <Route path="/" render={() => <BasicInfo user={user} />} />
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

import React from 'react';
import styled from 'styled-components';
import ContactsCompanies from './Settings/ContactsCompanies';
import BasicInfo from './Settings/BasicInfo';
import { Route, Link, Switch } from 'react-router-dom';

interface Settings {
  className?: string;
}

const Settings = ({ className }: Settings) => {
  return (
    <div className={className}>
      <ul>
        <li>
          <Link to="/basic">BasicInfo</Link>
        </li>
        <li>
          <Link to="/contacts-companies">Clients &amp; Companies</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/basic" component={BasicInfo} />
        <Route path="/contacts-companies" component={ContactsCompanies} />
        <Route path="/" component={BasicInfo} />
      </Switch>
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
  flex-direction: column;
`;

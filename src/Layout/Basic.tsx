import React from 'react';
import styled from 'styled-components';
import AppBar, { AppBarTitle } from '../AppBar/AppBar';
import { Grid, Item } from '../Grid';
import { Agenda, Clients, Home, Inbox, Invoices, ProjectManagement, TimeManagement } from '../Icon';
import { Navigation, NavigationItem } from '../Navigation/index';

interface Basic {
    className?: string;
    children?: JSX.Element | JSX.Element[];
}

const Left = styled(Item)`
    background: #F7F7F7;
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-bos;
    padding: 2em;
`;

const Back = styled.div`
    font-size: 12px;
    color: #1B2327;
    font-weight: 400;
`;

const Title = styled.h1`
    font-size: 22px;
    color: #1B2327;
    font-weight: 400;
`;

const Basic = styled(({className, children}: Basic) => {
    return (
        <div className={className}>
            <AppBar>
                <AppBarTitle>ZZP Online</AppBarTitle>
            </AppBar>
            <Grid height="500px" width="100%">
                <Left height="100%" width="200px">
                    <Navigation>
                        <NavigationItem icon={<Home />}>Dashboard</NavigationItem>
                        <NavigationItem icon={<Inbox />}>Inbox</NavigationItem>
                        <NavigationItem icon={<Clients />}>Clients</NavigationItem>
                        <NavigationItem isActive={true} icon={<Agenda />}>Agenda</NavigationItem>
                        <NavigationItem icon={<ProjectManagement />}>Project management</NavigationItem>
                        <NavigationItem icon={<Invoices />}>Invoices</NavigationItem>
                        <NavigationItem icon={<TimeManagement />}>Time management</NavigationItem>
                    </Navigation>
                </Left>
                <Item grow={true}>
                   <Main>
                       <Back>Back to dashboard</Back>
                       <Title>Clients management</Title>
                       {children}
                   </Main>
                </Item>
            </Grid>
        </div>
    );
})`
    width: 100%;
    height: 100%;
    background: #fffcfc;

    ${Navigation} {
        background: none;
    }
`;

export default Basic;

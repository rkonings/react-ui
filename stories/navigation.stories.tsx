import { storiesOf } from '@storybook/react';
import React from 'react';
import { Agenda, Clients, Home, Inbox, Invoices, ProjectManagement, TimeManagement } from '../src/Icon';

import { Navigation, NavigationItem } from '../src/Navigation';

storiesOf('Navigation', module)
.add('default', () => {
    return (
        <Navigation>
            <NavigationItem>Home</NavigationItem>
            <NavigationItem>Inbox</NavigationItem>
            <NavigationItem>Clients</NavigationItem>
            <NavigationItem isActive={true}>Agenda</NavigationItem>
            <NavigationItem>Tasks</NavigationItem>
            <NavigationItem>Dashboard</NavigationItem>
            <NavigationItem>Invoices</NavigationItem>
            <NavigationItem>Profit</NavigationItem>
        </Navigation>
    );
})
.add('with icons', () => {
    return (
        <Navigation>
            <NavigationItem icon={<Home />}>Dashboard</NavigationItem>
            <NavigationItem icon={<Inbox />}>Inbox</NavigationItem>
            <NavigationItem icon={<Clients />}>Clients</NavigationItem>
            <NavigationItem isActive={true} icon={<Agenda />}>Agenda</NavigationItem>
            <NavigationItem icon={<ProjectManagement />}>Project management</NavigationItem>
            <NavigationItem icon={<Invoices />}>Invoices</NavigationItem>
            <NavigationItem icon={<TimeManagement />}>Time management</NavigationItem>
        </Navigation>
    );
});

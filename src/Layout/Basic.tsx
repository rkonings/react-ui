import React from 'react';
import styled from 'styled-components';
import AppBar, { AppBarTitle } from '../AppBar/AppBar';
import { Grid, Item } from '../Grid';
import { Navigation } from '../Navigation/index';
import { Header, HeaderTitle, HeaderToolbar } from './Header';

interface Basic {
    className?: string;
    children?: JSX.Element | JSX.Element[];
    left: JSX.Element;
    pageTitle?: JSX.Element | string;
    toolbar?: JSX.Element | string;
}

const Left = styled(Item)`
    background: #f7f7f7;
`;

const Main = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 2em;
    display: flex;
    flex-direction: column;
`;

const Basic = styled(
    ({ className, children, left, pageTitle, toolbar }: Basic) => {
        return (
            <div className={className}>
                <AppBar>
                    <AppBarTitle>ZZP Online</AppBarTitle>
                </AppBar>
                <Grid height="calc(100% - 50px)" width="100%">
                    <Left height="100%" width="200px">
                        {left}
                    </Left>
                    <Item height="100%" width="calc(100% - 200px)">
                        <Main>
                            <Header>
                                {pageTitle && (
                                    <HeaderTitle>{pageTitle}</HeaderTitle>
                                )}
                                {toolbar && (
                                    <HeaderToolbar>{toolbar}</HeaderToolbar>
                                )}
                            </Header>
                            {children}
                        </Main>
                    </Item>
                </Grid>
            </div>
        );
    }
)`
    width: 100%;
    height: 100%;
    background: #fffcfc;

    ${Navigation} {
        background: none;
    }
`;

export default Basic;

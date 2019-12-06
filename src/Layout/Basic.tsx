import React from 'react';
import styled from 'styled-components';
import AppBar, { AppBarTitle } from '../AppBar/AppBar';
import { Grid, Item } from '../Grid';
import { Navigation } from '../Navigation/index';

interface Basic {
    className?: string;
    children?: JSX.Element | JSX.Element[];
    left: JSX.Element;
    pageTitle?: JSX.Element | string;
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

const Back = styled.div`
    font-size: 12px;
    color: #1b2327;
    font-weight: 400;
`;

const Title = styled.h1`
    font-size: 22px;
    color: #1b2327;
    font-weight: 400;
`;

const Basic = styled(({ className, children, left, pageTitle }: Basic) => {
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
                        <Back>Back to dashboard</Back>
                        {pageTitle && <Title>{pageTitle}</Title>}
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

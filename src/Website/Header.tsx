import React from 'react';
import styled from 'styled-components';
import { device } from '../Device';
import {
    MainNavigation,
    MobileNavigation,
    NavigationToggle,
    TopNavigation,
} from './';

interface Header {
    className?: string;
    logo: JSX.Element | string;
    children: JSX.Element | JSX.Element[];
    mobileNavigation: JSX.Element;
    contactInfo: JSX.Element | string;
    top?: JSX.Element;
}

const Logo = styled.div`
    box-sizing: border-box;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 0.5em 2em 2em 2em;
    font-size: 20px;

    svg {
        height: 40px;
    }

    @media ${device.tablet} {
        padding: 1em;
        font-size: 16px;
        height: 100%;

        svg {
            height: 30px;
        }
    }
`;

const Navigation = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    padding: 1em 0 2em 0;

    @media ${device.tablet} {
        display: none;
    }
`;

const Top = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 1em 2em 0 2em;

    @media ${device.tablet} {
        display: none;
    }
`;

// const ContactInfo = styled.div`
//     display: flex;
//     align-self: center;
//     margin: 2em;
//     padding: 0.8em 1em;
//     font-weight: 800;

//     ${({ theme: { color } }) => {
//         return `
//           background: ${color.black};
//           color: ${color.white};
//       `;
//     }}

//     @media ${device.tablet} {
//         display: none;
//     }
// `;

export const Header = styled(
    ({
        className,
        logo,
        children,
        mobileNavigation,
        contactInfo,
        top,
    }: Header) => {
        const [navOpen, setNavOpen] = React.useState<boolean>(false);

        return (
            <div className={className}>
                {top && (
                    <Top>
                        <TopNavigation>{top}</TopNavigation>
                    </Top>
                )}
                <Logo>{logo}</Logo>
                <Navigation>
                    <MainNavigation>{children}</MainNavigation>
                </Navigation>
                <NavigationToggle
                    open={navOpen}
                    onClick={() => setNavOpen(!navOpen)}
                />
                {navOpen && (
                    <MobileNavigation>{mobileNavigation}</MobileNavigation>
                )}
                {/* <ContactInfo>{contactInfo}</ContactInfo> */}
            </div>
        );
    }
)`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.5);

    flex-direction: row;
    justify-content: center;
    background: ${({ theme: { color } }) => color.white};

    @media ${device.tablet} {
        height: 80px;
        justify-content: space-between;
    }
`;

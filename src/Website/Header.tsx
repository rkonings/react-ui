import React from 'react';
import styled from 'styled-components';
import { device } from '../Device';
import { MainNavigation, MobileNavigation, NavigationToggle } from './';
import { usePortal } from '../Portal/Portal';

interface Header {
    className?: string;
    logo: JSX.Element | string;
    children: JSX.Element | JSX.Element[];
    mobileNavigation: JSX.Element;
}

const Logo = styled.div`
    box-sizing: border-box;
    font-weight: bold;
    padding: 2em;
    font-size: 20px;

    @media ${device.tablet} {
        padding: 1em;
        font-size: 16px;
    }
`;

const Navigation = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100%;
    align-items: center;
    padding: 0 2em;
`;

const ContactInfo = styled.div`
    display: flex;
    align-self: center;
    margin: 2em;
    padding: 0.8em 1em;
    font-weight: 800;

    ${({ theme: { color } }) => {
        return `
          background: ${color.black};
          color: ${color.white};
      `;
    }}

    @media ${device.tablet} {
        display: none;
    }
`;

export const Header = styled(
    ({ className, logo, children, mobileNavigation }: Header) => {
        const [navOpen, setNavOpen] = React.useState<boolean>(false);
        const { Portal } = usePortal();

        return (
            <div className={className}>
                <Logo>{logo}</Logo>
                <Navigation>
                    <MainNavigation>{children}</MainNavigation>
                </Navigation>
                <NavigationToggle
                    open={navOpen}
                    onClick={() => setNavOpen(!navOpen)}
                />
                {navOpen && (
                    <Portal onClose={() => setNavOpen(false)}>
                        <MobileNavigation>{mobileNavigation}</MobileNavigation>
                    </Portal>
                )}
                {/* <ContactInfo>+31 (020) - 4023777</ContactInfo> */}
            </div>
        );
    }
)`
    display: flex;
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    flex-direction: row;
    justify-content: center;
    background: ${({ theme: { color } }) => color.white};

    @media ${device.tablet} {
        height: 50px;
    }
`;

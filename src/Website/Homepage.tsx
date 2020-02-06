import React from 'react';
import styled from 'styled-components';
import { SubTitle, Title } from './';

interface HomepageBanner {
    className?: string;
    title?: string;
    subTitle?: string;
    background?: string;
}

export const HomepageBanner = styled(
    ({ className, title, subTitle }: HomepageBanner) => {
        return (
            <div className={className}>
                <Title>{title}</Title>
                <SubTitle>{subTitle}</SubTitle>
            </div>
        );
    }
)`
    width: 100%;
    height: 600px;
    background-size: cover;
    background-position: bottom;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    color: #ffffff;
    flex-direction: column;
    box-sizing: border-box;
    padding: 4em;

    ${({ background }) => {
        if (background) {
            return `
              background-image: url(${background});
        `;
        }

        return '';
    }}

    ${Title} {
        font-size: 28px;
        font-weight: 500;
    }

    ${SubTitle} {
        font-size: 20px;
    }
`;

interface Homepage {
    className?: string;
    children: JSX.Element | JSX.Element[];
}
// https://images.unsplash.com/photo-1573240612702-cbe5d249b7ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80

const Homepage = ({ className, children }: Homepage) => {
    return <div className={className}>{children}</div>;
};

export default styled(Homepage)`
    width: 100%;
    height: 100%;
`;

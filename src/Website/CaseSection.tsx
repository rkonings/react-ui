import React from 'react';
import styled from 'styled-components';

import { device } from '../Device';
import { Title } from './';

interface CasesSection {
    className?: string;
    title?: string;
    children: string | JSX.Element | JSX.Element[];
}

const CasesWrapper = styled.div`
    display: flex;
    width: 1000px;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    @media ${device.tablet} {
        width: 100%;
    }
`;

export const CasesSection = styled(
    ({ className, title, children }: CasesSection) => {
        return (
            <div className={className}>
                <Title>{title}</Title>
                <CasesWrapper>{children}</CasesWrapper>
            </div>
        );
    }
)`
    ${Title} {
        font-size: 24px;
        margin-bottom: 2em;
    }

    padding: 8em 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;

    @media ${device.tablet} {
        padding: 2em 1em;
        ${Title} {
            font-size: 20px;
            margin-bottom: 2em;
            width: 100%;
            text-align: center;
        }
    }
`;

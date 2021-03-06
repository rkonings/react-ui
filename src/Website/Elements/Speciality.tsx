import React from 'react';
import styled from 'styled-components';
import { device } from '../../Device';

import { Card } from './Card';

interface Speciality {
    className?: string;
    children: JSX.Element[];
}

export const SpecialityTitle = styled.div`
    width: 100%;
    font-size: 24px;
    margin-bottom: 0.5em;

    @media ${device.tablet} {
        margin-top: 1em;
    }
`;
export const SpecialityColumnLeft = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-right: 2em;

    ${Card} {
        width: 100%;
    }

    @media ${device.tablet} {
        width: 100%;

        ${Card} {
            width: 49%;
        }
    }
`;
export const SpecialityColumnRight = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    ${Card} {
        width: 30%;
    }

    @media ${device.tablet} {
        width: 100%;

        ${Card} {
            width: 49%;
        }
    }
`;

export const Speciality = styled(({ className, children }: Speciality) => {
    return <div className={className}>{children}</div>;
})`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    max-width: 1000px;
    box-sizing: border-box;

    ${Card} {
        margin: 2px;
        height: 170px;
        box-sizing: border-box;
    }

    @media ${device.tablet} {
        display: block;
        width: 100%;

        ${Card} {
            width: 48%;
        }
    }
`;

export const Speciality2 = styled(({ className, children }: Speciality) => {
    return <div className={className}>{children}</div>;
})`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    box-sizing: border-box;

    flex-wrap: wrap;
    max-width: 1000px;

    ${Card} {
        margin: 2px;
        height: 170px;
    }

    @media ${device.tablet} {
        display: block;
        width: 100%;

        ${Card} {
            width: 100%;
        }
    }
`;

export const Speciality3 = styled(({ className, children }: Speciality) => {
    return <div className={className}>{children}</div>;
})`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    box-sizing: border-box;

    flex-wrap: wrap;
    max-width: 1000px;
    width: 100%;

    ${Card} {
        margin: 2px;
        height: 300px;
        width: 23%;
    }

    @media ${device.tablet} {
        display: block;
        width: 100%;

        ${Card} {
            width: 100%;
            height: 150px;
        }
    }
`;

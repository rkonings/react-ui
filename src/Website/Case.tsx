import React from 'react';
import styled from 'styled-components';
import { device } from '../Device';

interface Case {
    className?: string;
    title: string | JSX.Element;
    subTitle?: string | JSX.Element;
    image?: string;
    children?: string;
}

const Title = styled.div`
    font-size: 18px;
    margin: 1em 0;
`;

const SubTitle = styled.div`
    font-size: 16px;
    margin-bottom: 1em;
`;

const Content = styled.div`
    font-size: 14px;
    margin-bottom: 1em;
    padding-right: 4em;
`;

const Image = styled.div`
    width: 100%;
    height: 170px;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
        filter: grayscale(0.5);
    }
`;

export const Case = styled(
    ({ className, title, subTitle, image, children }: Case) => {
        return (
            <div className={className}>
                <Image>
                    <img src={image} />
                </Image>
                <Title>{title}</Title>
                {subTitle && <SubTitle>{subTitle}</SubTitle>}
                {children && <Content>{children}</Content>}
            </div>
        );
    }
)`
    display: flex;
    flex: 1;
    flex-direction: column;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 2em;

    @media ${device.tablet} {
        width: 80%;
        flex: none;
        margin: 0 auto 2em auto;
        padding: 0em;

        ${Title} {
            font-size: 18px;
        }
    }
`;

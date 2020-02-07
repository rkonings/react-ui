import React from 'react';
import styled from 'styled-components';
import { device } from '../Device';

export const Title = styled.div`
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 1em;
    line-height: 1.1em;
`;

export const SubTitle = styled.div`
    font-size: 16px;
    margin-bottom: 1em;
    font-weight: 300;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 1.5em;
    box-sizing: border-box;
    width: 300px;

    @media ${device.tablet} {
        width: 100%;
        padding: 2em;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;

    @media ${device.tablet} {
        width: 100%;
    }
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;

    @media ${device.tablet} {
        width: 0%;
    }
`;

const Image = styled.div``;

interface Section {
    className?: string;
    children: JSX.Element | JSX.Element[] | string;
    title?: string;
    subTitle?: string;
    image?: string;
    reverse?: boolean;
}

export const ServiceSection = styled(
    ({ className, children, title, subTitle }: Section) => {
        return (
            <section className={className}>
                <ImageWrapper>
                    <Image />
                </ImageWrapper>
                <ContentWrapper>
                    <Content>
                        <Title>{title}</Title>
                        <SubTitle>{subTitle}</SubTitle>
                        {children}
                    </Content>
                </ContentWrapper>
            </section>
        );
    }
)`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
    padding: 10em 2em;
    align-items: center;
    justify-content: flex-end;

    ${Image} {
        width: 600px;
        height: 450px;
        background-size: cover;

        ${({ image }) => {
            if (image) {
                return `
                background-image: url(${image});
              `;
            }
            return '';
        }}
    }

    ${({ reverse, theme: { color } }) => {
        if (!reverse) {
            return '';
        }

        return `
          flex-direction: row-reverse;
          background: ${color.gray10};
        `;
    }}

    @media ${device.tablet} {
        padding: 2em 0em;

        ${Image} {
            height: 0px;
        }

    }
`;

export const ClientSection = styled(
    ({ className, children, title, subTitle }: Section) => {
        return (
            <section className={className}>
                <ImageWrapper>
                    <Image />
                </ImageWrapper>
                <ContentWrapper>
                    <Content>
                        <Title>{title}</Title>
                        <SubTitle>{subTitle}</SubTitle>
                        {children}
                    </Content>
                </ContentWrapper>
            </section>
        );
    }
)`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 6em 2em;
    align-items: flex-start;
    justify-content: flex-end;

    @media ${device.tablet} {
        flex-direction: column-reverse;
        padding: 2em 2em;
    }

    ${Content} {
        @media ${device.tablet} {
            width: 100%;
            padding: 0em 0em 2em 0;
        }
    }

    ${Image} {
        width: 650px;
        height: 350px;
        background-size: cover;

        ${({ image }) => {
            if (image) {
                return `
              background-image: url(${image});
            `;
            }
            return '';
        }}
    }

    ${ImageWrapper} {
        @media ${device.tablet} {
            width: 100%;
        }
    }

    ${({ theme: { color } }) => {
        return `
          background: ${color.black};
          color: ${color.white};
        `;
    }}

    ${({ reverse }) => {
        if (!reverse) {
            return '';
        }

        return `
          flex-direction: row-reverse;
        `;
    }}
`;

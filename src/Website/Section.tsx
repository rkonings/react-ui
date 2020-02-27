import React from 'react';
import styled from 'styled-components';
import { device } from '../Device';
import { ArrowRight } from '../Icon';

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

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 1.5em;
    box-sizing: border-box;
    max-width: 500px;

    @media ${device.tablet} {
        width: 100%;
        padding: 2em;
    }
`;

interface SectionNavigationItem {
    className?: string;
    children: string | JSX.Element;
    url: string;
    title?: string;
    active?: boolean;
}

export const SectionNavigationItem = styled(
    ({ className, children, title, url }: SectionNavigationItem) => {
        return (
            <li className={className}>
                <a href={url} title={title}>
                    {children} <ArrowRight />
                </a>
            </li>
        );
    }
)`
    list-style: none;
    margin: 0;

    a {
        color: ${({ theme: { color } }) => color.black};
        text-decoration: none;
        padding: 0.2em 0;
        width: 200px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        &::after {
            content: ' ';
            position: absolute;
            bottom: 3px;
            left: 0;
            width: 0;
            height: 1px;
            background: ${({ theme: { color } }) => color.black};
            opacity: 0;
            display: block;
            transition: all 0.3s ease-in-out;
        }

        ${ArrowRight} {
            fill: ${({ theme: { color } }) => color.gray80};
            transition: all 0.5s ease-in-out;
        }

        &:hover {
            ${ArrowRight} {
                transform: translate(5px, 0px);
            }

            &::after {
                width: 30px;
                opacity: 1;
            }
        }
    }
`;

interface SectionNavigation {
    className?: string;
    children: JSX.Element | JSX.Element[];
}

export const SectionNavigation = styled(
    ({ className, children }: SectionNavigation) => {
        return <ul className={className}>{children}</ul>;
    }
)`
    padding: 0;
`;

export const CallToAction = styled.div`
    padding: 2em 0 2em 0;
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

export const Section = styled.section`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5em 0;

    @media ${device.tablet} {
        display: block;
    }
`;

export const SelectionCol = styled.div`
    width: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    @media ${device.tablet} {
        width: 100%;
    }
`;

export const BigTextCenter = styled.div`
    font-size: 24px;
    text-align: center;
    max-width: 800px;
`;

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

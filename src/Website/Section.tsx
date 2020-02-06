import React from 'react';
import styled from 'styled-components';

export const Title = styled.div`
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 1em;
`;

export const SubTitle = styled.div`
    font-size: 16px;
    margin-bottom: 1em;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 1.5em;
    box-sizing: border-box;
    width: 300px;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
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

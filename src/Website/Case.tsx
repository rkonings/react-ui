import React from 'react';
import styled from 'styled-components';

interface Case {
    className?: string;
    title: string | JSX.Element;
    subTitle?: string | JSX.Element;
    image?: string;
    children: string;
}

const Title = styled.div`
    font-size: 18px;
    margin-bottom: 0.5em;
`;

const SubTitle = styled.div`
    font-size: 16px;
    margin-bottom: 1em;
`;

const Content = styled.div`
    font-size: 14px;
    margin-bottom: 1em;
`;

const Image = styled.div`
    width: 100%;
    img {
        width: 100%;
        height: auto;
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
                <SubTitle>{subTitle}</SubTitle>
                <Content>{children}</Content>
            </div>
        );
    }
)`
    display: flex;
    width: 30%;
    flex-direction: column;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 2em;
`;

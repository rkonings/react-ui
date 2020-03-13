import React from 'react';
import styled from 'styled-components';

interface Card {
    className?: string;
    title: string;
    image: string;
}

const Title = styled.div`
    color: #ffffff;
    font-weight: 600;
    padding: 1em;
`;

export const Card = styled(({ className, title }: Card) => {
    return (
        <div className={className}>
            <Title>{title}</Title>
        </div>
    );
})`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    box-sizing: border-box;
    width: 300px;
    height: 150px;

    ${({ image }) => `
            background-image: linear-gradient(to bottom,rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.8)), url(${image});
            background-size: cover;
      `}
`;

import React from 'react';
import styled from 'styled-components';

import { Phone } from '../../Icon';
import { device } from '../../Device';

interface Expert {
    className?: string;
    phone?: string;
    image: string;
    title: string;
    content: string;
}

const Title = styled.div`
    font-size: 20px;
`;

const PhoneNumber = styled.div`
    ${Phone} {
        margin-top: 1em;
        margin-right: 1em;
    }
`;

const Content = styled.div``;
const Image = styled.div`
    margin: -1em -1em 1em -1em;
    img {
        width: 100%;
        height: auto;
    }
`;

export const Expert = styled(
    ({ className, phone, image, title, content }: Expert) => {
        return (
            <div className={className}>
                <Image>
                    <img src={image} />
                </Image>
                <Title>{title}</Title>
                <Content>{content}</Content>
                <PhoneNumber>
                    <Phone />
                    {phone}
                </PhoneNumber>
            </div>
        );
    }
)`
    width: 100%;
    max-width: 400px;
    background: ${({ theme: { color } }) => color.gray10};
    box-sizing: border-box;
    padding: 1em;

    @media ${device.tablet} {
        margin: 0 auto;
    }
`;

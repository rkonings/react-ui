import React from 'react';
import styled from 'styled-components';

interface SettingsField {
    className?: string;
    input: JSX.Element;
    label: string;
    description?: string;
}

const Content = styled.div`
    width: 60%;
`;

const Input = styled.div`
    margin-left: 2em;
    margin-right: 1em;
`;

const Label = styled.div`
    font-weight: 500;
    font-size: 15px;
`;
const Description = styled.div`
    color: ${({ theme: { color } }) => color.gray80};
    font-size: 14px;
`;

const CoreSettingsField = ({
    className,
    input,
    label,
    description,
}: SettingsField) => {
    return (
        <div className={className}>
            <Content>
                <Label>{label}</Label>
                {description && <Description>{description}</Description>}
            </Content>
            <Input>{input}</Input>
        </div>
    );
};

const SettingsField = styled(CoreSettingsField)`
    display: flex;
    padding: 1.5em;
    width: 100%;
    flex-direction: row;
    align-items: center;
    min-height: 50px;
    justify-content: space-between;
    margin-bottom: 1em;
    ${({ theme: { color } }) => {
        return `
            border: 1px solid ${color.gray40};
        `;
    }}
`;

export default SettingsField;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 1em;
`;

export const Section = styled.div`
    width: 100%;

    ${SettingsField} {
        border-bottom-width: 0;
        margin-bottom: 0;
    }

    ${SettingsField}:last-child {
        border-bottom-width: 1px;
        margin-bottom: 1em;
    }
`;

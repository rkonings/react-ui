import React from 'react';
import styled from 'styled-components';
import { Search } from '../../Icon';
import TextField from '../TextField/TextField';

export const MenuItem = styled.a`
    padding: 15px 25px;
    color: ${({theme: { menu: { item } }}) => item.default.color };
    display: flex;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        ${({theme: { menu: {item: { hover}} }}) => {
            return `
                background: ${hover.backgroundColor};
                color: ${hover.color};
            `;
        } }
    }
`;

export const Menu = styled.div`
    ${({theme: { menu}}) => {
        return `
            background: ${menu.backgroundColor};
            box-shadow: ${menu.boxShadow};
        `;
    }}

    width: 100%;
    display:flex;
    flex-direction: column;
    min-width: 200px;
`;
interface SearchField {
    className?: string;
    result?: string[];
    onChange(searchValue: string): void;
}

const SearchField = ({className, result, onChange}: SearchField) => {

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return (
        <div className={className}>
            <TextField
                prefix={<Search/>}
                onChange={(e) => {
                    const value = e.currentTarget.value;
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    timeoutId = setTimeout(() => onChange(value), 500);

                }}
            />
            {result && result.length > 0 && (
                <Menu>
                    {result.map((item) => (<MenuItem key={item}>{item}</MenuItem>))}
                </Menu>
            )}

        </div>
    );
};

export default styled(SearchField)`
    position: relative;
    ${Menu} {
        position: absolute;
    }
`;

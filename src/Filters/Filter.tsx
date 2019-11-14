import React from 'react';
import styled from 'styled-components';
import { AngleDown, Check } from '../Icon';
import { CustomCheckBox } from '../Input/Checkbox/Checkbox';

interface Filter {
    value: string[];
    className?: string;
    options: string[];
    open?: boolean;
    label: string | JSX.Element;
    onChange(value: string[]): void;
    onClick(): void;
}

interface MenuItem {
    className?: string;
    children: string;
    selected: boolean;
    onClick(e: React.MouseEvent): void;
}

export const MenuItem = styled(({className, children, selected, onClick}: MenuItem) => {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <CustomCheckBox>
                {selected && <Check />}
            </CustomCheckBox>
            {children}
        </div>
    );
})`
    padding: 15px 25px;
    color: ${({theme: { menu: { item } }}) => item.default.color };
    display: flex;
    cursor: pointer;
    font-size: 14px;

    ${CustomCheckBox} {
        margin-right: 10px;
    }

    &:hover1 {
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

    position: absolute;
`;

const StyledClickAway = styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
`;

const FilterName = styled.div`
    padding: 1em;
    position: relative;
    z-index: 1;
    cursor: pointer;

`;
const Filter = ({className, options, onChange, open = false, value, onClick, label}: Filter) => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set(value));
    return (
        <div className={className}>
            <FilterName
                onClick={() => onClick()}
            >
                {label} <AngleDown />
            </FilterName>
            {open && (
                <React.Fragment>
                    <StyledClickAway onClick={() => onClick()} />
                    <Menu>
                        {options.map((item) => (
                            <MenuItem
                                key={item}
                                selected={selected.has(item)}
                                onClick={() => {
                                    const s = new Set(selected);
                                    if (s.has(item)) {
                                        s.delete(item);
                                    } else {
                                        s.add(item);
                                    }
                                    setSelected(s);
                                    onChange(Array.from(s));
                                }}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Menu>
                </React.Fragment>
            )}
        </div>
    );
};

export default styled(Filter)`
    position: relative;
`;

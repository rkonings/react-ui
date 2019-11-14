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
    onKeyDown(e: React.KeyboardEvent): void;
}

interface MenuItem {
    className?: string;
    children: string;
    selected: boolean;
    onClick(e: React.MouseEvent): void;
    onKeyDown(e: React.KeyboardEvent): void;
}

export const MenuItem = styled(({className, children, selected, onClick, onKeyDown}: MenuItem) => {
    return (
        <div
            className={className}
            onClick={onClick}
            onKeyDown={onKeyDown}
            tabIndex={0}
        >
            <CustomCheckBox>
                {selected && <Check />}
            </CustomCheckBox>
            {children}
        </div>
    );
})`
    padding: 10px 18px;
    color: ${({theme: { menu: { item } }}) => item.default.color };
    display: flex;
    cursor: pointer;
    font-size: 14px;

    ${CustomCheckBox} {
        margin-right: 10px;
    }

    &:focus {
        outline: none;
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
    min-width: 300px;
    padding: 10px 0;
    max-height: 200px;
    overflow-y: scroll;

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
    display: flex;
    align-items: center;
`;

const ItemCount = styled.div`
    font-size: 10px;
    margin-top: -10px;
    width: 10px;
    text-align: center;
`;

const Filter = ({className, options, onChange, open = false, value, onClick, label, onKeyDown}: Filter) => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set(value));

    const selectHandler = (item: string) => {
        const s = new Set(selected);
        if (s.has(item)) {
            s.delete(item);
        } else {
            s.add(item);
        }
        setSelected(s);
        onChange(Array.from(s));
    };

    return (
        <div className={className}>
            <FilterName
                onKeyDown={onKeyDown}
                tabIndex={0}
                onClick={() => onClick()}
            >
                {label} <ItemCount>{selected.size > 0 ? selected.size : ''}</ItemCount> <AngleDown />
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
                                    selectHandler(item);
                                }}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 32) { //Space
                                        selectHandler(item);
                                    }
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
    ${FilterName} {
        color: ${({open, theme: { color }}) => open ? color.primary : color.black };

        &:focus {
            outline: none;
            color: ${({theme: { color }}) => color.primary};
        }
    }
`;

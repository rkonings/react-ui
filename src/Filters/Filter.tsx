import Fuse from 'fuse.js';
import React from 'react';
import styled from 'styled-components';
import { AngleDown, Check, Search } from '../Icon';
import { CustomCheckBox } from '../Input/Checkbox/Checkbox';
import TextField from '../Input/TextField/TextField';
import { FilterOption } from './FilterBar';

interface Filter {
    value: string[];
    className?: string;
    options: FilterOption[];
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

interface OptionItem {
    className?: string;
    option: FilterOption;
    selected: boolean;
    onSelect(value: string): void;
}

const OptionItem = styled(({className, option, selected, onSelect}: OptionItem) => {
    return (
        <div className={className}>
            <MenuItem
                selected={selected}
                onClick={() => {
                    onSelect(option.value);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 32) { // Space
                        onSelect(option.value);
                    }
                }}
            >
                {option.label}
            </MenuItem>
        </div>
    );
})``;

interface Options {
    className?: string;
    options: FilterOption[];
    selected: Set<string>;
    onSelect(item: string): void;
}
const Options = styled(({className, onSelect, options, selected}: Options) => {
    return (
        <div className={className}>
            {options.map((option) => {
                if (selected.has(option.value)){
                    return null;
                }
                return (
                    <OptionItem
                        key={option.value}
                        option={option}
                        onSelect={onSelect}
                        selected={false}
                    />
                );
            })}
        </div>
    );
})``;

interface Options {
    className?: string;
    options: FilterOption[];
    selected: Set<string>;
    onSelect(item: string): void;
}

const SelectedOptionsTitle = styled.div`
    font-size: 10px;
`;

const SelectedOptions = styled(({className, options, onSelect, selected}: Options) => {
    const selectedOptions = options.filter((item) => selected.has(item.value));
    return (
        <div className={className}>
            <SelectedOptionsTitle>Selected</SelectedOptionsTitle>
            {selectedOptions.map((option) => (
                <OptionItem
                    key={option.value}
                    option={option}
                    onSelect={onSelect}
                    selected={true}
                />
            ))}
        </div>
    );
})`
    padding-bottom: 20px;
`;

const Filter = ({className, options, onChange, open = false, value, onClick, label, onKeyDown}: Filter) => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set(value));
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [result, setResult] = React.useState<FilterOption[]>(options);

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

    const fuseOptions: Fuse.FuseOptions<FilterOption> = {
        maxPatternLength: 32,
        minMatchCharLength: 3,
        threshold: 0.2,
        keys: ['label']
    };
    const fuse = new Fuse(options, fuseOptions);

    const searchHandler = (value: string) => {
        setSearchValue(value);
        if (value.length === 0) {
            setResult(options);
        } else {
            const results = fuse.search(value);
            setResult(results);
        }
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
                        <TextField
                            value={searchValue}
                            prefix={<Search />}
                            onChange={(e) => searchHandler(e.currentTarget.value)}
                        />
                        <SelectedOptions options={options} onSelect={selectHandler} selected={selected} />
                        <Options options={result} onSelect={selectHandler} selected={selected} />
                    </Menu>
                </React.Fragment>
            )}
        </div>
    );
};

export default styled(Filter)`

    ${TextField} {
        padding: 0 20px 20px;
        box-sizing: border-box;
    }

    position: relative;
    ${FilterName} {
        color: ${({open, theme: { color }}) => open ? color.primary : color.black };

        &:focus {
            outline: none;
            color: ${({theme: { color }}) => color.primary};
        }
    }
`;

import React from 'react';
import styled from 'styled-components';
import { Close, Search } from '../../Icon';
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
    onChange(searchValue: string, search?: boolean): void;
}

const StyledClickAway = styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
`;

const Clear = styled.div``;

const SearchField = ({className, result, onChange}: SearchField) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const [showClear, setShowClear] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>('');
    const [timeoutId, setTimeoutId] = React.useState<ReturnType<typeof setTimeout> | undefined>();

    React.useEffect(() => {
        setShowClear(value.length > 0 ? true : false);
    }, [value]);

    const clear = () => {
        setIsOpen(false);
        setValue('');
        onChange('', false);
    }

    return (
        <div className={className}>
            <TextField
                onFocus={() => setIsOpen(true)}
                prefix={<Search/>}
                onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                        setIsOpen(false);
                    }
                }}
                postfix={showClear ? (
                    <Clear onClick={() => clear()}>
                        <Close />
                    </Clear>
                ) : undefined}
                value={value}
                onChange={(e) => {
                    const newValue = e.currentTarget.value;
                    setValue(newValue);
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    if (newValue.length > 0) {
                        setTimeoutId(setTimeout(() => onChange(newValue), 500));
                    } else {
                        onChange(newValue, false);
                    }
                }}
            />
            {result && result.length > 0 && isOpen && (
                <React.Fragment>
                    <StyledClickAway onClick={() => setIsOpen(false)} />
                    <Menu>
                        {result.map((item) => (
                            <MenuItem
                                key={item}
                                onClick={() => {
                                    setIsOpen(false);
                                    setValue(item);
                                    onChange(item, false);
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

export default styled(SearchField)`
    position: relative;
    ${TextField} {
        position: relative;
        z-index: 1;
    }
    ${Menu} {
        position: absolute;
        z-index: 999;
        max-height: 185px;
        overflow-y: scroll;
    }

    ${Close} {
        cursor: pointer;
    }
`;

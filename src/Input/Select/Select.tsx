import useFocusTrap from '@charlietango/use-focus-trap';
import * as React from 'react';
import styled from 'styled-components';

import { ArrowDown, ArrowUp } from '../../Icon/index';
import { Size  } from '../../interfaces/Theme';
import { ErrorText, HelperText } from '../Core/';

interface Select extends HelperText, ErrorText {
    className?: string;
    value?: string;
    name?: string;
    isOpen?: boolean;
    options: string[];
    width?: string;
    size?: Size;
    onChange?(value: string): void;
    onBlur?(e: React.FormEvent<HTMLInputElement>): void;
}

interface Arrow {
    className?: string;
    direction?: 'UP' | 'DOWN';
}

const Arrow = ({className, direction = 'DOWN'}: Arrow) => {
    return (
        <div className={className}>
            {direction === 'DOWN' && <ArrowDown />}
            {direction === 'UP' && <ArrowUp />}
        </div>
    );
};

const StyledArrow = styled(Arrow)`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
`;

const StyledMenu = styled.div`
    ${({theme: { input: { select }}}) => `
        border: ${select.borderSize} solid ${select.focus.borderColor};
    `}
    border-top: 0;
    box-sizing: border-box;
    width: 100%;
`;

interface MenuItem {
    selected?: boolean;
}

const StyledMenuItem = styled.div<MenuItem>`

    ${({ selected, theme: { input: { select: { focus } } } }) =>  {
        if (selected) {
            return `
                background: ${focus.item.backgroundColor};
                color: ${focus.item.color};
            `;
        }
        return null;
    }};
    padding 1em;
    font-size: 14px;
    &:hover {
        ${({selected, theme: { input: { select: { hover, focus } }}}) =>  {
            if (selected) {
                return `
                    background: ${focus.item.backgroundColor};
                    color: ${focus.item.color};
                `;
            }
            return `
                background: ${hover.item.backgroundColor};
                color: ${hover.item.color};
            `;
        }};


        ${({selected, theme: { color}}) =>  selected ? `color: ${color.white};` : null}
    }
`;
interface InputWrapper {
    isFocused: boolean;
}

const InputWrapper = styled.div<InputWrapper & ErrorText>`
    border: 1px solid ${({errorText, isFocused = false, theme: { input: { select, error }}}) => {
        if (errorText) {
            return error.color;
        }
        return isFocused ? select.focus.borderColor : select.default.borderColor;
    }};
    transition : border 500ms ease-out;
    box-sizing: border-box;
    position: relative;
    width: 100%;

    ${StyledArrow} {
        position: absolute;
        right:0;
        top: 0;
    }

    input {
        padding: 1em;
        width: 100%;
        padding-right: 50px;
        font-size: 14px;
        box-sizing: border-box;
        border: none;
        color: #263238;
        cursor: default;

        &:focus {
            outline: none;
        }
    }

    &:hover {
        ${({theme: { input: { select: { hover}} }}) => `
            border: 1px solid ${hover.borderColor} ;
        `};
    }
`;

const StyledClickAway = styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
`;

const Select  = ({className, options, value: _value, isOpen: _open = false,
    onChange, helperText, errorText}: Select) => {
    const [value, setValue] = React.useState<string>('');
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [selectedItem, setSelectedItem] = React.useState<string | undefined>();
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const focusTrap = useFocusTrap();

    React.useEffect(() => {
        const val = _value || options[0];
        setValue(val);
        setSelectedItem(val);
        setIsOpen(_open);
    }, []);

    const changeValue = (val: string) => {
        if (val !== value) {
            setValue(val);
            if (onChange) {
                onChange(val);
            }
        }
    };

    const nextSelectedItem = () => {
        let nextIndex = 0;
        const currentIndex = options.findIndex( (option) => option === selectedItem );
        if (currentIndex < options.length - 1) {
            nextIndex = currentIndex + 1;
        }

        setSelectedItem(options[nextIndex]);
    };

    const prevSelectedItem = () => {
        const currentIndex = options.findIndex( (option) => option === selectedItem );
        let prevIndex = currentIndex - 1;
        if (currentIndex === 0) {
            prevIndex = options.length - 1;
        }
        setSelectedItem(options[prevIndex]);
    };

    const keyPressHandler = (e: KeyboardEvent) => {

        if ((e.key === 'Enter' || e.key === 'ArrowDown') && !isOpen && isFocused) {
            e.preventDefault();
            setIsOpen(true);
        } else if ((e.key === 'Escape') && isOpen) {
            setIsOpen(false);
        } else if (e.key === 'Enter' && isOpen) {
            e.preventDefault();
            if (selectedItem) {
                changeValue(selectedItem);
            }
            setIsOpen(false);
        } else if (e.key === 'ArrowUp' && isOpen) {
            prevSelectedItem();
        } else if (e.key === 'ArrowDown' && isOpen) {
            nextSelectedItem();
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', keyPressHandler);
        return () => {
            document.removeEventListener('keydown', keyPressHandler);
        };
    });

    return (
        <div ref={isOpen ? focusTrap : null} className={className}>
            <InputWrapper
                isFocused={isFocused}
                onClick={() => {
                    setIsOpen(!isOpen);
                    setIsFocused(true);
                }}
                errorText={errorText}
            >
                <input
                    readOnly={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        if (!isOpen) {
                            setIsFocused(false);
                        }
                    }}
                    type="text"
                    name={name}
                    onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}
                    value={value}
                />
                <StyledArrow direction={(isOpen) ? 'UP' : 'DOWN'} />
            </InputWrapper>
            {helperText && !errorText && <HelperText>{helperText}</HelperText>}
            {errorText && <ErrorText>{errorText}</ErrorText>}
            { isOpen && (
                <React.Fragment>
                    <StyledClickAway onClick={() => setIsOpen(false)} />
                    <StyledMenu >
                        {options.map(
                            (option, optIndex) => (
                                <StyledMenuItem
                                    onClick={() => {
                                        setSelectedItem(option);
                                        setIsOpen(false);
                                        changeValue(option);
                                    }}
                                    key={optIndex}
                                    selected={selectedItem === option}
                                >
                                    {option}
                                </StyledMenuItem>
                            )
                        )}
                    </StyledMenu>

                </React.Fragment>
            )}
        </div>
    );
};

const StyledSelect = styled(Select)<Select>`
    position: relative;
    width: ${({width = '100%'}) => width};

    input {
        font-size: ${({theme: { input: {select} }, size = 'm'}) => select.size[size]}px;
    }

    ${StyledMenuItem} {
        font-size: ${({theme: { input: {select} }, size = 'm'}) => select.size[size]}px;
    }

    ${StyledMenu} {
        border-top: 0;
        top:${({theme: { input: {select} }, size = 'm'}) => select.size[size] * 3}px;
        z-index: 1600;
        background: #ffffff;
        left:0;
        width: 100%;
        position: absolute;
    }
`;

export default StyledSelect;

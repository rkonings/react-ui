import React from 'react';
import styled from 'styled-components';
import Month from '../../Calendar/Month';

import * as Yup from 'yup';
import Button from '../../Button/Button';
import TextButton from '../../Button/TextButton';
import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import { CaretDown, Close } from '../../Icon';
import Popover from '../../Popover/Popover';

const Menu = styled.div`
    margin: -14px 0 14px 0;
`;

interface MenuItem {
    isActive?: boolean;
}

export const MenuItem = styled.a<MenuItem>`
    padding: 10px 15px;
    margin: 0 -1em;
    color: ${({
        theme: {
            menu: { item },
        },
    }) => item.default.color};
    display: flex;
    cursor: pointer;
    font-size: 14px;

    ${({
        theme: {
            menu: { item },
        },
        isActive,
    }) => {
        if (isActive) {
            return `
                background: ${item.active.backgroundColor};
                color: ${item.active.color};
            `;
        }
        return;
    }};

    &:hover {
        ${({
            theme: {
                menu: {
                    item: { hover },
                },
            },
        }) => {
            return `
                background: ${hover.backgroundColor};
                color: ${hover.color};
            `;
        }}
    }
`;

interface InlineEditableSelect {
    className?: string;
    onChange?: (value: string | null) => void;
    value?: string;
    options: string[];
    validationSchema: Yup.ObjectSchema;
    field: string;
    placeholder?: string;
}

const Clear = styled.div`
    display: none;
    ${Close} {
        margin-right: 4px;
        margin-left: 4px;
        height: 10px;
        width: 10px;
    }
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:hover {
        ${Clear} {
            display: flex;
        }
    }
`;

const Value = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    font-size: 12px;
`;

const InlineEditableSelect = ({
    className,
    value,
    onChange,
    field,
    options,
    validationSchema,
    placeholder = 'select',
}: InlineEditableSelect) => {
    const [error, setError] = React.useState<Yup.ValidationError | null>(null);
    const [currentValue, setCurrentValue] = React.useState<string | null>(
        value || null
    );
    const [selectedValue, setSelectedValue] = React.useState<string | null>(
        value || null
    );

    React.useEffect(() => {
        setCurrentValue(value || null);
        setSelectedValue(value || null);
    }, [value]);

    const onValueChange = (value: string) => {
        if (value) {
            validationSchema
                .validateAt(field, { [field]: value })
                .then(_ => {
                    setError(null);
                    setSelectedValue(value);
                })
                .catch(error => setError(error));
        }
    };

    const cancel = () => {
        setSelectedValue(currentValue);
    };

    const save = () => {
        if (error) {
            return;
        }
        setCurrentValue(selectedValue);

        if (onChange) {
            onChange(selectedValue);
        }
    };

    const clear = () => {
        setCurrentValue(null);
        setSelectedValue(null);
        if (onChange) {
            onChange(null);
        }
    };

    return (
        <div className={className}>
            <Popover
                link={setOpen => (
                    <Label>
                        <Value onClick={() => setOpen(true)}>
                            {currentValue ? currentValue : placeholder}
                        </Value>
                        {selectedValue && (
                            <Clear onClick={() => clear()}>
                                <Close />
                            </Clear>
                        )}

                        <span onClick={() => setOpen(true)}>
                            <CaretDown />
                        </span>
                    </Label>
                )}
            >
                {setOpen => (
                    <React.Fragment>
                        <Menu>
                            {options.map(option => (
                                <MenuItem
                                    onClick={() => onValueChange(option)}
                                    isActive={option === selectedValue}
                                    key={option}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                        <ButtonGroup size="s">
                            <TextButton
                                onClick={() => {
                                    cancel();
                                    setOpen(false);
                                }}
                            >
                                cancel
                            </TextButton>
                            <Button
                                type="primary"
                                onClick={() => {
                                    save();
                                    setOpen(false);
                                }}
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    </React.Fragment>
                )}
            </Popover>
        </div>
    );
};

export default styled(InlineEditableSelect)`
    ${Month} {
        text-align: left;
        width: 300px;
    }
`;

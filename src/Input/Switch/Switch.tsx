import * as React from 'react';
import styled from 'styled-components';
import { HelperText } from '../Core';

interface Switch extends HelperText {
    className?: string;
    checked?: boolean;
    name?: string;
    label?: string;
    onChange?(checked: boolean): void;
}

const InnerCheckbox = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    z-index: 1;
    position: absolute;
    width: 100%;
    cursor: pointer;
`;

const SwitchThumb = styled.div`
    position: absolute;
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    transition: left 0.1s ease-in;
    left: 0;
    background: ${({ theme: { input } }) => input.switch.default.thumbColor};
`;

const CustomSwitch = styled.div<Switch>`
    ${SwitchThumb} {
        ${({ theme: { input }, checked }) => {
            const toggle = input.switch;
            return `
                background: ${
                    checked
                        ? toggle.checked.thumbColor
                        : toggle.default.thumbColor
                };
            `;
        }};
    }

    background: ${({ theme: { input } }) =>
        input.switch.default.backgroundColor};
    height: 15px;
    width: 30px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    border-radius: 30px;
`;

const Label = styled.span`
    font-size: 13px;
    margin-left: 15px;
    color: ${({ theme: { input } }) => input.switch.label};
`;

const Switch = ({
    className,
    checked = false,
    helperText,
    onChange,
    name,
    label,
}: Switch) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    const onChangeHandler = (checked: boolean) => {
        setIsChecked(checked);
        if (onChange) {
            onChange(checked);
        }
    };

    React.useEffect(() => setIsChecked(checked), [checked]);

    return (
        <div className={className}>
            <label>
                <InnerCheckbox
                    checked={isChecked}
                    name={name}
                    onChange={({ target: { checked } }) =>
                        onChangeHandler(checked)
                    }
                />
                <CustomSwitch checked={isChecked}>
                    <SwitchThumb />
                </CustomSwitch>
                {label && <Label>{label}</Label>}
            </label>
            {helperText && <HelperText>{helperText}</HelperText>}
        </div>
    );
};

const StyledSwitch = styled(Switch)`
    display:flex;
    flex-direction: column;

    label {
        display: flex;

        &:hover {
            ${/*sc-selector*/ CustomSwitch} {
                background: ${({ theme: { input } }) =>
                    input.switch.hover.backgroundColor};
            }
        }
    }

    position: relative;
    ${/*sc-selector*/ InnerCheckbox}:checked ~ ${/*sc-selector*/ CustomSwitch} {

        ${SwitchThumb} {
            left: calc(100% - 15px);
        }
    }


`;

export default StyledSwitch;

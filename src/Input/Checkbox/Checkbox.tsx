import * as React from 'react';
import styled from 'styled-components';
import { Check } from '../../Icon';
import { Size as CheckBoxSize, Type as CheckBoxType } from '../../interfaces/Theme';
import { ErrorText, HelperText } from '../Core/index';

const InnerCheckbox = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

interface CustomCheckBoxProps {
    size?: CheckBoxSize;
}

export const CustomCheckBox = styled.div<CustomCheckBoxProps & ErrorText>`
    ${({theme: {type = 'default', input : { checkbox, error }, icon}, size = 'm', errorText}) => {
        const borderColor = errorText ? error.color : checkbox[type].default.borderColor;

        return `
            border: ${checkbox.borderSize} solid ${borderColor};
            border-radius: ${checkbox.borderRadius};
            background: ${checkbox[type].default.backgroundColor};
            width: ${checkbox.size[size]}px;
            height: ${checkbox.size[size]}px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
                border-color: ${checkbox[type].hover.borderColor};

            }
        `;
    }};
`;

interface CheckBoxProps extends HelperText, ErrorText {
    className?: string;
    checked?: boolean;
    size?: CheckBoxSize;
    type?: CheckBoxType;
    name?: string;
    label?: string | JSX.Element;
    onChange?(checked: boolean): void;
}

const CheckBoxLabel = styled.span``;

const CheckBox = ({className, onChange, checked = false, size = 'm',
name, label, helperText, errorText}: CheckBoxProps) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    const onChangeHandler = (checked: boolean) => {
        setIsChecked(checked);
        if (onChange) { onChange(checked); }
    };

    React.useEffect(() => setIsChecked(checked), [checked]);

    return (
        <div className={className}>
            <label>
                <InnerCheckbox
                    checked={isChecked}
                    name={name}
                    onChange={({target: { checked }}) => onChangeHandler(checked)}
                />
                <CustomCheckBox size={size} errorText={errorText}>
                    <Check type="default" />
                </CustomCheckBox>
                {label && <CheckBoxLabel>{label}</CheckBoxLabel>}
            </label>
            {helperText && !errorText && <HelperText>{helperText}</HelperText>}
            {errorText && <ErrorText>{errorText}</ErrorText>}
        </div>

    );
};

const StyledCheckBox = styled(CheckBox)`
    ${({size = 'm', type = 'default', theme: { input: { checkbox, errorText, helper} } } ) => `
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;

        label {
            display: flex;
            align-items: center;
            justigy-content: flex-start;
        }

        ${InnerCheckbox} {
            width: ${checkbox.size[size]}px;
            height: ${checkbox.size[size]}px;
        }

        ${/*sc-selector*/Check} {
            opacity: 0;
            fill: ${checkbox[type].default.color};
            width: ${checkbox.size[size] - 4}px;
            height: ${checkbox.size[size] - 4}px;
        }
        ${/*sc-selector*/InnerCheckbox}:checked ~ ${/*sc-selector*/CustomCheckBox} {
            background: ${checkbox[type].checked.backgroundColor};
            ${/*sc-selector*/Check} {
                opacity: 1;
                fill: ${checkbox[type].checked.color}};
            }
        }

        ${CheckBoxLabel} {
            font-size: 13px;
            margin-left: 15px;
            color: ${checkbox[type].default.label};
        }
        `
    }
`;

export default StyledCheckBox;

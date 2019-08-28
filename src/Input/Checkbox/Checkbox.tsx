import * as React from 'react';
import styled from 'styled-components';
import { Check } from '../../Icon';
import { Size as CheckBoxSize, Type as CheckBoxType } from '../../interfaces/Theme';
import theme from '../../themes/default';

const InnerCheckbox = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    position: absolute;
`;

interface CustomCheckBoxProps {
    size?: CheckBoxSize;
}

const CustomCheckBox = styled.div<CustomCheckBoxProps>`
    ${({theme: {type = 'default', input : { checkbox }, icon}, size = 'm'}) => {
        return `
            border: ${checkbox.borderSize} solid ${checkbox[type].default.borderColor};
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

interface CheckBoxProps {
    className?: string;
    checked?: boolean;
    size?: CheckBoxSize;
    type?: CheckBoxType;
    name?: string;
    label?: string | JSX.Element;
    onChange?(checked: boolean): void;
}

const CheckBoxLabel = styled.span``;

const CheckBox = ({className, onChange, checked = false, size = 'm', name, label}: CheckBoxProps) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    const onChangeHandler = (checked: boolean) => {
        setIsChecked(checked);
        if (onChange) { onChange(checked); }
    };

    React.useEffect(() => setIsChecked(checked), [checked]);

    return (
        <label className={className}>
            <InnerCheckbox
                checked={isChecked}
                name={name}
                onChange={({target: { checked }}) => onChangeHandler(checked)}
            />
            <CustomCheckBox size={size}>
                <Check type="default" />
            </CustomCheckBox>
            {label && <CheckBoxLabel>{label}</CheckBoxLabel>}
        </label>
    );
};

const StyledCheckBox = styled(CheckBox)`
    ${({size = 'm', type = 'default', theme: { input: { checkbox} } } ) => `
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;

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

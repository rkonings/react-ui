import * as React from 'react';
import styled from 'styled-components';
import { Check } from '../../Icon/';
import { Size as CheckBoxSize, Type as CheckBoxType } from '../../interfaces/Theme';

const InnerCheckbox = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    position: absolute;
`;

const CustomCheckBox = styled.div`
    ${({theme: {type = 'default', input : { checkbox }}}) => `
        border: ${checkbox.borderSize} solid ${checkbox[type].default.borderColor};
        border-radius: ${checkbox.borderRadius};
        background: ${checkbox[type].default.background};
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            border-color: ${checkbox[type].hover.borderColor};

        }
    `}

`;

interface CheckBoxProps {
    className?: string;
    checked?: boolean;
    size?: CheckBoxSize;
    type?: CheckBoxType;
    onChange?(checked: boolean): void;
}

const CheckBox = ({className, onChange, checked = false, size = 'm'}: CheckBoxProps) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    const onChangeHandler = (checked: boolean) => {
        setIsChecked(checked);
        if (onChange) { onChange(checked); }
    };

    React.useEffect(() => setIsChecked(checked), [checked]);

    return (
        <label className={className}>
            <InnerCheckbox checked={isChecked} onChange={({target: { checked }}) => onChangeHandler(checked)} />
            <CustomCheckBox>
                <Check type="default" size={size} />
            </CustomCheckBox>
        </label>
    );
};

const StyledCheckBox = styled(CheckBox)`
    ${({type = 'default', theme: { input: { checkbox} } } ) => `
        position: relative;

        ${/*sc-selector*/Check} {
            opacity: 0;
            fill: ${checkbox[type].default.color}};
        }
        ${/*sc-selector*/InnerCheckbox}:checked ~ ${/*sc-selector*/CustomCheckBox} {
            background: ${checkbox[type].checked.backgroundColor};
            ${/*sc-selector*/Check} {
                opacity: 1;
                fill: ${checkbox[type].checked.color}};
            }
        }
    `}
`;

export default StyledCheckBox;

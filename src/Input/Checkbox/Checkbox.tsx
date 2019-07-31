import * as React from 'react';
import styled from 'styled-components';
import { Check } from '../../Icon/';

const InnerCheckbox = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    position: absolute;
`;

const SIZE = 12;

const CustomCheckBox = styled.div`
    background: #ccc;
    width: ${SIZE}px;
    height: ${SIZE}px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const StyledPolyline = styled.polyline`
    stroke: #000000;
`;

const SVG = styled.svg`
    opacity: 0;
`;

interface CheckBoxProps {
    className?: string;
    checked?: boolean;
    onChange?(checked: boolean): void;
}

const CheckBox = ({className, onChange, checked = false}: CheckBoxProps) => {
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
                <Check type="default" width={SIZE - 2} height={SIZE - 2} />
            </CustomCheckBox>
        </label>
    );
};

const StyledCheckBox = styled(CheckBox)`
    position: relative;
    ${Check} {
            opacity: 0;
        }
    ${/*sc-selector*/InnerCheckbox}:checked ~ ${/*sc-selector*/CustomCheckBox} {
        ${Check} {
            opacity: 1;
        }
    }
`;

export default StyledCheckBox;

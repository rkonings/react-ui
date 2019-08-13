import * as React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '../Button/Button';
import Theme, { Size as ButtonGroupSize } from '../interfaces/Theme';

type ButtonGroupType = 'default' | 'primary' | 'secondairy';

interface ButtonGroupProps {
    size?: ButtonGroupSize;
    type?: ButtonGroupType;
    theme?: Theme;
    className?: string;
    setActive?: boolean;
    children: JSX.Element | JSX.Element[];
}

const ButtonGroup = ({setActive = false, className, children, type, size}: ButtonGroupProps) => {

    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    const buttons = React.Children.map(children, (child, index) => {
        return React.cloneElement<ButtonProps>(child, {
            type: child.props.type || type,
            size,
            onClick: (event) => {
                if (setActive) {setActiveIndex(index); }
                if (child.props.onClick) { child.props.onClick(event); }
            },
            active: (activeIndex === index)
          });
    });
    return <div className={className}>{buttons}</div>;
};

const StyledButtonGroup = styled(ButtonGroup)`
    display: flex;
    flex-direction: row;
    align-items: center;

    ${Button} {
        ${({theme: { buttonGroup }, type = 'default'}) => {
            return `
                border-width: 0px;
                border-color: ${buttonGroup[type].borderColor};
                border-style: solid;
                border-right-width: 1px;

                &:first-child {
                    border-left-width: 0;
                }
                &:last-child {
                    border-right-width: 0;
                }

            `;
        }
    }
`;

export default StyledButtonGroup;

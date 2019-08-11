import * as React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '../Button/Button';
import Theme, { Size as ButtonGroupSize } from '../interfaces/Theme';

type ButtonGroupType = 'default' | 'primary' | 'secondairy';

interface ButtonGroupProps {
    size?: ButtonGroupSize;
    type?: ButtonGroupType;
    outline?: boolean;
    theme?: Theme;
    className?: string;
    children: JSX.Element | JSX.Element[];
}

const ButtonGroup = ({className, children, type, size, outline}: ButtonGroupProps) => {

    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    const buttons = React.Children.map(children, (child, index) => {
        return React.cloneElement<ButtonProps>(child, {
            type: child.props.type || type,
            size,
            outline,
            onClick: () => {
                setActiveIndex(index);
                if (child.props.onClick) { child.props.onClick(); }
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
        ${({outline, theme: { buttonGroup }, type = 'default'}) => {
            if (outline) {
                return `
                    border-right-width: 0;
                    &:last-child {
                        border-right-width: 1px;
                    }
                `;
            }
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

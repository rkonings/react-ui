import useFocusTrap from '@charlietango/use-focus-trap';
import * as React from 'react';
import styled from 'styled-components';

import {
    Button,
    ButtonType,
    ButtonVariant,
    OutlinedButton,
    TextButton,
} from '../Button';
import { Size } from '../interfaces/Theme';
import { Menu } from './Menu';

const StyledClickAway = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

interface ButtonMenu {
    className?: string;
    menuAlign?: 'LEFT' | 'RIGHT';
    type?: ButtonType;
    children: string | JSX.Element | Array<string | JSX.Element>;
    size?: Size;
    variant?: ButtonVariant;
    active?: boolean;
    items(close: () => void): JSX.Element;
}

const getComponent = (variant: ButtonVariant = 'default') => {
    switch (variant) {
        case 'outlined':
            return OutlinedButton;
            break;
        case 'text':
            return TextButton;
            break;
        case 'default':
        default:
            return Button;
            break;
    }
};

const ButtonMenu = ({
    className,
    items,
    children,
    size = 'm',
    type = 'default',
    variant,
}: ButtonMenu) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const focusTrap = useFocusTrap();
    const Component = getComponent(variant);

    return (
        <div className={className}>
            <Component
                active={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                type={type}
                size={size}
            >
                {children}
            </Component>
            {isOpen && (
                <React.Fragment>
                    <StyledClickAway onClick={() => setIsOpen(false)} />
                    <Menu dropShadow={true} ref={isOpen ? focusTrap : null}>
                        {items(() => setIsOpen(false))}
                    </Menu>
                </React.Fragment>
            )}
        </div>
    );
};

const StyledButtonMenu = styled(ButtonMenu)`
    position: relative;
    ${Menu} {
        position: absolute;
        ${({ menuAlign }) => (menuAlign === 'RIGHT' ? 'right:0;' : null)}
    }
`;

export default StyledButtonMenu;

import useFocusTrap from '@charlietango/use-focus-trap';
import * as React from 'react';
import styled from 'styled-components';

import Button, { ButtonType } from '../Button/Button';
import { Size } from '../interfaces/Theme';
import { Menu, MenuItem } from './Menu';

const StyledClickAway = styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
`;

interface ButtonMenu {
    className?: string;
    menuAlign?: 'LEFT' | 'RIGHT';
    type?: ButtonType;
    children: string | JSX.Element | Array<string | JSX.Element>;
    size?: Size;
    active?: boolean;
    items(close: () => void): JSX.Element;
}

const ButtonMenu = ({className, items, children, size = 'm', type = 'default'}: ButtonMenu) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const focusTrap = useFocusTrap();

    return (
        <div className={className}>
            <Button
                active={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                type={type}
                size={size}
            >{
                children}
            </Button>
            {isOpen && (
                <React.Fragment>
                    <StyledClickAway onClick={() => setIsOpen(false)} />
                    <Menu ref={isOpen ? focusTrap : null}>
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
        ${({menuAlign}) => (menuAlign === 'RIGHT') ? 'right:0;' : null}
    }
`;

export default StyledButtonMenu;

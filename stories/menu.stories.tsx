import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import ButtonMenu from '../src/Menu/ButtonMenu';
import { MenuItem } from '../src/Menu/Menu';
import { Size } from 'interfaces/Theme';
import { ButtonType } from 'Button';

storiesOf('Menu', module)
.add('Button menu', () => {
    const menuAlign = select('Menu alignment', ['LEFT', 'RIGHT'], 'LEFT');
    const typeLabel = 'Type';
    const typeOptions = ['default', 'primary', 'secondairy'];
    const typeDefaultValue = 'default';
    const sizeLabel = 'Size';
    const variant = select('Variant', ['default', 'outlined', 'text'], 'default');
    const sizeOptions = {
        xs: 'xs',
        s: 's',
        m: 'm',
        l: 'l',
        xl: 'xl'
    };
    const sizeDefaultValue = 'm';

    const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
    const type = select(typeLabel, typeOptions, typeDefaultValue);
    return (
        <ButtonMenu
            size={size as Size}
            type={type as ButtonType}
            variant={variant}
            menuAlign={menuAlign}
            items={ (close) => (
                <React.Fragment>
                    <MenuItem onClick={() => close()}>Profile</MenuItem>
                    <MenuItem onClick={() => close()}>Settings</MenuItem>
                    <MenuItem onClick={() => close()}>Sign out</MenuItem>
                </React.Fragment>
            )}
        >
            Menu
        </ButtonMenu>
    );
});

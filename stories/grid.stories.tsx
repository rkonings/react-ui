import { number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../src/Button/Button';
import { Grid, Item } from '../src/Grid';
import StyledTextField from '../src/Input/TextField/TextField';
import { HorizontalAlignment, VerticalAlignment } from 'Grid/Grid';

storiesOf('Grid', module)

.add('with Alignment', () => {
    const hAlignmentOptions = [
        'flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'
    ];

    const vAlignmentOptions = [
        'flex-start', 'center', 'flex-end', 'stretch', 'baseline'
    ];

    const hAlignment = select('Horizontal', hAlignmentOptions, 'flex-start');
    const vAlignment = select('Vertical', vAlignmentOptions, 'flex-start');

    return (
        <Grid
            width="100%"
            height="600px"
            horizontalAlignment={hAlignment as HorizontalAlignment}
            verticalAlignment={vAlignment as VerticalAlignment}
        >
            <Button>Alignment</Button>
            <Button>Alignment</Button>
        </Grid>
    );
})
.add('with spacing', () => {
    const spacing = number('Spacing', 10);
    return (
        <Grid
            spacing={spacing}
            width="100%"
            height="600px"
            horizontalAlignment="center"
            verticalAlignment="center"
        >
            <Item width="50%">
                <Button width="100%">Spacing</Button>
            </Item>
            <Item width="50%">
                <Button width="100%">Spacing</Button>
            </Item>
        </Grid>
    );
})

.add('example form', () => {
    return (
        <Grid width="100%" height="600px" horizontalAlignment="center" verticalAlignment="center">
            <Grid width="400px" spacing={10} verticalAlignment="flex-start">
                <Item width="50%">
                    <StyledTextField width="100%" placeHolder="firstname" />
                </Item>
                <Item width="50%">
                    <StyledTextField width="100%" placeHolder="lastname" />
                </Item>
                <Item width="100%">
                    <StyledTextField width="100%" placeHolder="E-mail adress" />
                </Item>
                <Item width="100%">
                    <StyledTextField width="100%" placeHolder="Address" />
                </Item>
                <Item width="33.33%">
                    <StyledTextField width="100%" placeHolder="city" />
                </Item>
                <Item width="33.33%">
                    <StyledTextField width="100%" placeHolder="zipcode" />
                </Item>
                <Item width="33.33%">
                    <StyledTextField width="100%" placeHolder="state" />
                </Item>
                <Item width="33.33%">
                    <Button type="primary">Save</Button>
                </Item>
            </Grid>
        </Grid>
    );
});

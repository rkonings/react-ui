import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Header, { HeaderSubTitle, HeaderTitle } from '../src/Header/Header';

storiesOf('Header', module)
.add('default', () => {
    return (
        <Header>
            <HeaderTitle>Header Title</HeaderTitle>
        </Header>
    );
})
.add('with subtitle', () => {
    return (
        <Header>
            <HeaderTitle>Header Title</HeaderTitle>
            <HeaderSubTitle>Subtitle</HeaderSubTitle>
        </Header>
    );
})
.add('with background image', () => {
    return (
        <Header
            backgroundImage={text('Image', 'https://static.ah.nl/static/recepten/img_RAM_PRD123131_1600x560_JPG.jpg')}
        >
            <HeaderTitle>Header Title</HeaderTitle>
            <HeaderSubTitle>Subtitle</HeaderSubTitle>
        </Header>
    );
});

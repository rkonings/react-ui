import { storiesOf } from '@storybook/react';
import React from 'react';
import { text } from '@storybook/addon-knobs';

import { Card } from '../../src/Website/Card';

storiesOf('website/elements', module).add('card', () => {
    const title = text('title', 'Woonkamer');
    const image = text(
        'image',
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    );

    return <Card title={title} image={image} />;
});

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Conversion } from '../../src/Website/form';

storiesOf('website/foms', module).add('Conversion', () => {
    return <Conversion onChange={action('change')} />;
});

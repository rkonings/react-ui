import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import icon from '../src/themes/icon';

import * as Icons from '../src/Icon';

const IconStories = storiesOf('Icon', module);

const typeLabel = 'Colors';
const typeOptions = {
  Default: 'default',
  Primary: 'primary',
  Secondairy: 'secondairy'
};
const typeDefaultValue = 'default';

Object.keys(Icons).forEach((Icon) => {
  IconStories.add(Icon, () => {
    const ComponentName = Icons[Icon];
    const type = select(typeLabel, typeOptions, typeDefaultValue);

    const sizeOptions = Object.keys(icon.size);
    const size = select('Size', sizeOptions, 'm');
    return (
      <ComponentName type={type} size={size} />
    );
  });
});

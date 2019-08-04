import { storiesOf } from '@storybook/react';
import React from 'react';

import * as Icons from '../src/Icon';

const IconStories = storiesOf('Icon', module);

Object.keys(Icons).forEach((Icon) => {
  IconStories.add(Icon, () => {
    const ComponentName = Icons[Icon];
    return (
      <ComponentName />
    );
  });
});

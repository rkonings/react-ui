import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import ThemeProviderDecorator from './ThemeProviderDecorator';
import CenterStoryDecorator from './CenterStoryDecorator';
import GlobalStyleDecorator from './GlobalStyleDecorator';

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withKnobs);
addDecorator(ThemeProviderDecorator);
addDecorator(GlobalStyleDecorator);
addDecorator(CenterStoryDecorator);

configure(loadStories, module);
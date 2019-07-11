import { configure, addDecorator } from '@storybook/react';
import ThemeProviderDecorator from './ThemeProviderDecorator';
// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}


addDecorator(ThemeProviderDecorator);

configure(loadStories, module);
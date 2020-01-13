import * as React from 'react';
import { PortalProvider } from '../src/Portal/Portal';

const PortalProviderDecorator = storyFn => (
    <PortalProvider>{storyFn()}</PortalProvider>
);

export default PortalProviderDecorator;

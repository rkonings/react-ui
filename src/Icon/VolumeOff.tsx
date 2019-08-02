/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgVolumeOff = (props: IconProps) => (
  <svg viewBox="0 0 256 512" {...props}>
    <path d="M215 71l-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.06L215 441c15 15 41 4.47 41-17V88c0-21.47-26-32-41-17z" />
  </svg>
);

export default styled(SvgVolumeOff)`
  ${SVGIcon};
  ${IconSpacing};
`;

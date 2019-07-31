/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgEgg = (props: IconProps) => (
  <svg viewBox="0 0 384 512" {...props}>
    <path d="M192 0C86 0 0 214 0 320s86 192 192 192 192-86 192-192S298 0 192 0z" />
  </svg>
);

export default styled(SvgEgg)`
  ${SVGIcon};
`;

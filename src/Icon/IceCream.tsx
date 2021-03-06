/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgIceCream = (props: IconProps) => (
  <svg viewBox="0 0 448 512" {...props}>
    <path d="M368 160h-.94a144 144 0 1 0-286.12 0H80a48 48 0 0 0 0 96h288a48 48 0 0 0 0-96zM195.38 493.69a31.52 31.52 0 0 0 57.24 0L352 288H96z" />
  </svg>
);

export default styled(SvgIceCream)`
  ${SVGIcon};
  ${IconSpacing};
`;

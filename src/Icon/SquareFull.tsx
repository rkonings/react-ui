/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgSquareFull = (props: IconProps) => (
  <svg viewBox="0 0 512 512" {...props}>
    <path d="M512 512H0V0h512v512z" />
  </svg>
);

export default styled(SvgSquareFull)`
  ${SVGIcon};
  ${IconSpacing};
`;

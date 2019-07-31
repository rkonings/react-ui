/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgCross = (props: IconProps) => (
  <svg viewBox="0 0 384 512" {...props}>
    <path d="M352 128h-96V32c0-17.67-14.33-32-32-32h-64c-17.67 0-32 14.33-32 32v96H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h96v224c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V256h96c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32z" />
  </svg>
);

export default styled(SvgCross)`
  ${SVGIcon};
`;

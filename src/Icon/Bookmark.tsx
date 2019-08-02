/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgBookmark = (props: IconProps) => (
  <svg viewBox="0 0 384 512" {...props}>
    <path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z" />
  </svg>
);

export default styled(SvgBookmark)`
  ${SVGIcon};
  ${IconSpacing};
`;

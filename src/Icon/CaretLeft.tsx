/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgCaretLeft = (props: IconProps) => (
  <svg viewBox="0 0 192 512" {...props}>
    <path d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z" />
  </svg>
);

export default styled(SvgCaretLeft)`
  ${SVGIcon};
  ${IconSpacing};
`;

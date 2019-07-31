/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon } from '../mixins/SVGIcon';

const SvgSquareFull = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" {...props}>
    <path d="M512 512H0V0h512v512z" />
  </svg>
);

export default styled(SvgSquareFull)`
  ${SVGIcon};
`;

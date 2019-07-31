/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon } from '../mixins/SVGIcon';

const SvgChalkboard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 640 512" {...props}>
    <path d="M96 64h448v352h64V40c0-22.06-17.94-40-40-40H72C49.94 0 32 17.94 32 40v376h64V64zm528 384H480v-64H288v64H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" />
  </svg>
);

export default styled(SvgChalkboard)`
  ${SVGIcon};
`;

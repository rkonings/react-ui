/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon } from '../mixins/SVGIcon';

const SvgSwatchbook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 511 512" {...props}>
    <path d="M479.06 320H372.29L186.15 506.51c-2.06 2.07-4.49 3.58-6.67 5.49h299.58c17.64 0 31.94-14.33 31.94-32V352c0-17.67-14.3-32-31.94-32zm-44.5-152.9l-90.33-90.51c-12.47-12.5-32.69-12.5-45.17 0l-75.5 75.65V416c0 2.96-.67 5.73-.87 8.64l211.87-212.28c12.47-12.5 12.47-32.77 0-45.26zM191.62 32c0-17.67-14.3-32-31.94-32H31.94C14.3 0 0 14.33 0 32v384c0 53.02 42.9 96 95.81 96s95.81-42.98 95.81-96V32zM95.81 440c-13.23 0-23.95-10.75-23.95-24 0-13.26 10.73-24 23.95-24s23.95 10.74 23.95 24c.01 13.25-10.72 24-23.95 24zm31.94-184H63.88v-64h63.88v64zm0-128H63.88V64h63.88v64z" />
  </svg>
);

export default styled(SvgSwatchbook)`
  ${SVGIcon};
`;

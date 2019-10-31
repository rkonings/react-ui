/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgProjectManagement = (props: IconProps) => (
  <svg viewBox="0 0 512 512" fill="none" {...props}>
    <g clipPath="url(#project-management_svg__clip0)">
      <path
        d="M145.35 207a8.006 8.006 0 0 0-8.748-1.747A7.995 7.995 0 0 0 134 207l-71 71-39-39a8 8 0 0 0-11.31 0L1.35 250.34a8 8 0 0 0 0 11.32l56 56a8 8 0 0 0 11.31 0l88-88a7.986 7.986 0 0 0 2.346-5.66 8 8 0 0 0-2.346-5.66L145.35 207zM62.93 384c-17.67 0-32.4 14.33-32.4 32s14.73 32 32.4 32a31.997 31.997 0 0 0 32-32 31.999 31.999 0 0 0-32-32zm82.42-337a8.005 8.005 0 0 0-8.748-1.747c-.974.405-1.859.999-2.602 1.747l-71 71-39-39a8 8 0 0 0-11.31 0L1.35 90.34a8 8 0 0 0 0 11.32l56 56a8 8 0 0 0 11.31 0l88-88a7.992 7.992 0 0 0 1.736-8.723 7.986 7.986 0 0 0-1.736-2.597L145.35 47zM503 400H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-320H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8V88a8.001 8.001 0 0 0-8-8zm0 160H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="project-management_svg__clip0">
        <path fill="#fff" d="M0 0h512v512H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default styled(SvgProjectManagement)`
  ${SVGIcon};
  ${IconSpacing};
`;

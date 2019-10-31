/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgInbox = (props: IconProps) => (
  <svg viewBox="0 0 576 512" fill="none" {...props}>
    <g clipPath="url(#inbox_svg__clip0)">
      <path
        d="M566.819 227.377L462.377 83.768A48.006 48.006 0 0 0 423.557 64H152.443a47.995 47.995 0 0 0-38.819 19.768L9.181 227.377A47.997 47.997 0 0 0 0 255.609V400c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V255.609a47.998 47.998 0 0 0-9.181-28.232zM139.503 102.589A16.05 16.05 0 0 1 152.443 96h271.115c5.102 0 9.939 2.463 12.94 6.589L524.796 224H388.223l-32 64H219.777l-32-64H51.204l88.299-121.411zM544 272v128c0 8.823-7.178 16-16 16H48c-8.822 0-16-7.177-16-16V272c0-8.837 7.163-16 16-16h120l32 64h176l32-64h120c8.837 0 16 7.163 16 16z"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="inbox_svg__clip0">
        <path fill="#fff" d="M0 0h576v512H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default styled(SvgInbox)`
  ${SVGIcon};
  ${IconSpacing};
`;

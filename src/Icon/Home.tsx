/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgHome = (props: IconProps) => (
  <svg viewBox="0 0 512 448" fill="none" {...props}>
    <path
      d="M508.946 197.147l-61-49.83v-77.4a6 6 0 0 0-6-6h-20a6.003 6.003 0 0 0-6 6v51.33L276.136 7.127a32.158 32.158 0 0 0-40.38 0L2.946 197.147a8.002 8.002 0 0 0-1.16 11.24l10.1 12.41a7.996 7.996 0 0 0 11.2 1.19l40.86-33.38v243a15.999 15.999 0 0 0 16 16h128a15.998 15.998 0 0 0 16-16v-128l64 .3v128.08a16 16 0 0 0 16 16l128-.33a15.998 15.998 0 0 0 16-16v-243.05l40.86 33.38a7.995 7.995 0 0 0 11.25-1.16l10.1-12.41a7.99 7.99 0 0 0 1.735-5.886 7.997 7.997 0 0 0-2.945-5.384zm-93.11 218.59h.1l-96 .3v-128.17a16.049 16.049 0 0 0-15.95-16l-96-.27a16.014 16.014 0 0 0-11.346 4.669 15.987 15.987 0 0 0-4.704 11.331v128.14h-95.99v-253.24l160-130.57 160 130.57-.11 253.24z"
      fill="#000"
    />
  </svg>
);

export default styled(SvgHome)`
  ${SVGIcon};
  ${IconSpacing};
`;

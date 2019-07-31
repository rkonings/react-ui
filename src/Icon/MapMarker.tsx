/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon } from '../mixins/SVGIcon';

const SvgMapMarker = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 384 512" {...props}>
    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z" />
  </svg>
);

export default styled(SvgMapMarker)`
  ${SVGIcon};
`;
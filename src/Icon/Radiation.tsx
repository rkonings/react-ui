/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon } from '../mixins/SVGIcon';

const SvgRadiation = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 496 512" {...props}>
    <path d="M328.2 255.8h151.6c9.1 0 16.8-7.7 16.2-16.8-5.1-75.8-44.4-142.2-102.5-184.2-7.4-5.3-17.9-2.9-22.7 4.8L290.4 188c22.6 14.3 37.8 39.2 37.8 67.8zm-37.8 67.7c-12.3 7.7-26.8 12.4-42.4 12.4-15.6 0-30-4.7-42.4-12.4L125.2 452c-4.8 7.7-2.4 18.1 5.6 22.4C165.7 493.2 205.6 504 248 504s82.3-10.8 117.2-29.6c8-4.3 10.4-14.8 5.6-22.4l-80.4-128.5zM248 303.8c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48zm-231.8-48h151.6c0-28.6 15.2-53.5 37.8-67.7L125.2 59.7c-4.8-7.7-15.3-10.2-22.7-4.8C44.4 96.9 5.1 163.3 0 239.1c-.6 9 7.1 16.7 16.2 16.7z" />
  </svg>
);

export default styled(SvgRadiation)`
  ${SVGIcon};
`;

/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon, IconSpacing } from '../mixins/SVGIcon';
import IconProps from '../interfaces/IconProps';

const SvgYenSign = (props: IconProps) => (
  <svg viewBox="0 0 384 512" {...props}>
    <path d="M351.2 32h-65.3c-4.6 0-8.8 2.6-10.8 6.7l-55.4 113.2c-14.5 34.7-27.1 71.9-27.1 71.9h-1.3s-12.6-37.2-27.1-71.9L108.8 38.7c-2-4.1-6.2-6.7-10.8-6.7H32.8c-9.1 0-14.8 9.7-10.6 17.6L102.3 200H44c-6.6 0-12 5.4-12 12v32c0 6.6 5.4 12 12 12h88.2l19.8 37.2V320H44c-6.6 0-12 5.4-12 12v32c0 6.6 5.4 12 12 12h108v92c0 6.6 5.4 12 12 12h56c6.6 0 12-5.4 12-12v-92h108c6.6 0 12-5.4 12-12v-32c0-6.6-5.4-12-12-12H232v-26.8l19.8-37.2H340c6.6 0 12-5.4 12-12v-32c0-6.6-5.4-12-12-12h-58.3l80.1-150.4c4.3-7.9-1.5-17.6-10.6-17.6z" />
  </svg>
);

export default styled(SvgYenSign)`
  ${SVGIcon};
  ${IconSpacing};
`;

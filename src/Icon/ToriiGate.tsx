/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { SVGIcon } from '../mixins/SVGIcon';

const SvgToriiGate = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" {...props}>
    <path d="M376.45 32h-240.9A303.17 303.17 0 0 1 0 0v96c0 17.67 14.33 32 32 32h32v64H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h48v240c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V256h256v240c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V256h48c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16h-48v-64h32c17.67 0 32-14.33 32-32V0a303.17 303.17 0 0 1-135.55 32zM128 128h96v64h-96v-64zm256 64h-96v-64h96v64z" />
  </svg>
);

export default styled(SvgToriiGate)`
  ${SVGIcon};
`;

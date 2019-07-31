import * as React from 'react';
import styled from 'styled-components';

interface IconProps {
    width?: number;
    height?: number;
    className?: string;
}

const Icon = ({width = 20, height = 20, className}: IconProps) => {
    return (
        <svg className={className} width={width} height={height} viewBox="0 0 54.757 54.757">
            <path d="M27.557,12c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S31.416,12,27.557,12z M27.557,24c-2.757,0-5-2.243-5-5
		s2.243-5,5-5s5,2.243,5,5S30.314,24,27.557,24z"/>
          <path d="M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952
		L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M41.099,31.431L27.38,51.243L13.639,31.4
		C8.44,24.468,9.185,13.08,15.235,7.031C18.479,3.787,22.792,2,27.38,2s8.901,1.787,12.146,5.031
        C45.576,13.08,46.321,24.468,41.099,31.431z"/>
        </svg>
    );
};

export const IconLeft = styled(Icon)`
    margin-right: 0.5em;
`;
export const IconRight = styled(Icon)`
    margin-left: 0.5em;
`;
export default Icon;
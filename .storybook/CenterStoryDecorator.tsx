import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const CenterStoryDecorator = storyFn => (<Wrapper>{storyFn()}</Wrapper>);

export default CenterStoryDecorator;
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import Color from '../src/Color/Color';

const Wrapper = styled.div`
  width: 800px;
  display: flex;
  flex-direction: row;
`;

storiesOf('Color', module)
  .add('Blue', () => (
    <React.Fragment>
      <Wrapper>
        <Color color="blue" />
        <Color color="blue10" />
        <Color color="blue20" />
        <Color color="blue30" />
        <Color color="blue40" />
        <Color color="blue50" />
        <Color color="blue60" />
        <Color color="blue70" />
        <Color color="blue80" />
        <Color color="blue90" />
        <Color color="blue100" />
        <Color color="blue110" />
      </Wrapper>
    </React.Fragment>
  ))
  .add('Orange', () => (
    <React.Fragment>
      <Wrapper>
        <Color color="orange" />
        <Color color="orange10" />
        <Color color="orange20" />
        <Color color="orange30" />
        <Color color="orange40" />
        <Color color="orange50" />
        <Color color="orange60" />
        <Color color="orange70" />
        <Color color="orange80" />
        <Color color="orange90" />
        <Color color="orange100" />
        <Color color="orange110" />
      </Wrapper>
    </React.Fragment>
  ))
  .add('Gray', () => (
    <React.Fragment>
      <Wrapper>
        <Color color="gray" />
        <Color color="gray10" />
        <Color color="gray20" />
        <Color color="gray30" />
        <Color color="gray40" />
        <Color color="gray50" />
        <Color color="gray60" />
        <Color color="gray70" />
        <Color color="gray80" />
        <Color color="gray90" />
        <Color color="gray100" />
        <Color color="gray110" />
        <Color color="gray120" />
        <Color color="gray130" />
      </Wrapper>
    </React.Fragment>
  ));

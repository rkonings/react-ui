import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import InlineEditableText from '../../src/Input/InlineEditable/InlineEditableText';

const validationSchema = Yup.object({
    title: Yup.string().required('is required'),
});

const Wrapper = styled.div`
    width: 400px;
`;

storiesOf('Input/InlineEditable', module).add('default', () => {
    return (
        <Wrapper>
            <InlineEditableText
                field="title"
                onChange={action('onChange')}
                validationSchema={validationSchema}
                value="FOO is not BAZ or FOOBAR"
            />
            <InlineEditableText
                field="title"
                onChange={action('onChange')}
                validationSchema={validationSchema}
                value="FOO is not BAZ or FOOBAR"
                type="TEXTAREA"
            />
            <InlineEditableText
                field="title"
                onChange={action('onChange')}
                validationSchema={validationSchema}
                value="FOO is not BAZ or FOOBAR"
            />
        </Wrapper>
    );
});

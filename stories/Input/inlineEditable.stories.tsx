import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import InlineEditableDate from '../../src/Input/InlineEditable/InlineEditableDate';
import InlineEditableText from '../../src/Input/InlineEditable/InlineEditableText';
const validationSchema = Yup.object({
    title: Yup.string().required('is required'),
    date: Yup.date(),
});

const Wrapper = styled.div`
    width: 400px;
`;

storiesOf('Input/InlineEditable', module)
    .add('no date', () => {
        return (
            <InlineEditableDate
                field="date"
                onChange={action('onChange')}
                validationSchema={validationSchema}
            />
        );
    })
    .add('default', () => {
        return (
            <Wrapper>
                <InlineEditableDate
                    field="date"
                    onChange={action('onChange')}
                    validationSchema={validationSchema}
                    value={moment()}
                />
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

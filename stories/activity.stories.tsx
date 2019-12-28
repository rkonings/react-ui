import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import styled from 'styled-components';
import Activity from '../src/Activity/Activity';
import UpdateActivity from '../src/Activity/UpdateActivity';
import * as Yup from 'yup';

const Wrapper = styled.div`
    width: 500px;
    height: 500px;
`;

const validationSchema = Yup.object({
    _id: Yup.string().notRequired(),
    title: Yup.string().min(1, 'title is required'),
    notes: Yup.string(),
    creationDate: Yup.date().required('Date is required'),
    type: Yup.string().required('type is required'),
});

storiesOf('Activity', module)
    .add('default', () => {
        const activity = {
            type: 'call',
            title: 'rem neque laborum consequuntur',
            notes:
                'Est ex et velit quas reprehenderit nesciunt.\nRepellendus mollitia tempora explicabo iure fugiat omnis harum accusamus ad.\nImpedit magni cupiditate ut.\nMinima qui cupiditate.\nQuaerat eum veritatis.',
            creationDate: new Date(1552769616138),
        };

        return (
            <Wrapper>
                <Activity activity={activity} />
            </Wrapper>
        );
    })
    .add('update', () => {
        const activity = {
            type: 'call',
            title: 'rem neque laborum consequuntur',
            notes:
                'Est ex et velit quas reprehenderit nesciunt.\nRepellendus mollitia tempora explicabo iure fugiat omnis harum accusamus ad.\nImpedit magni cupiditate ut.\nMinima qui cupiditate.\nQuaerat eum veritatis.',
            creationDate: new Date(1552769616138),
        };

        return (
            <Wrapper>
                <UpdateActivity
                    validationSchema={validationSchema}
                    activity={activity}
                    onRemove={action('remove')}
                    onChange={(items, options, callBack) => {
                        callBack();
                        action('onChange')(items, options);
                    }}
                />
            </Wrapper>
        );
    });

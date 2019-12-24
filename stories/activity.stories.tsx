import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import Activity from '../src/Activity/Activity';

const Wrapper = styled.div`
    width: 500px;
    height: 500px;
`;
storiesOf('Activity', module).add('default', () => {
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
});

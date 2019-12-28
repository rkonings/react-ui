import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { Agenda } from '../Icon';

export interface Activity {
    type: string;
    title: string;
    client?: string;
    notes: string;
    creationDate: Date;
}

interface ActivityProps {
    className?: string;
    activity: Activity;
}

const ActivityType = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme: { color } }) => color.gray110};
    text-transform: capitalize;
`;

const ActivityDate = styled.div`
    color: ${({ theme: { color } }) => color.gray80};
    font-weight: 400;
    font-size: 12px;
    text-align: right;
`;

const ActivityTitle = styled.div`
    color: ${({ theme: { color } }) => color.gray110};
    font-weight: 500;
    margin-bottom: 0.5em;
`;

const ActivityNotes = styled.div`
    color: ${({ theme: { color } }) => color.gray80};
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4em;
`;

const ActivityHeader = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 1em;
    justify-content: space-between;
`;

const ActivityIcon = styled.div`
    position: absolute;
    top: 15px;
    left: 20px;

    svg {
        width: 15px;
        height: 15px;
    }
`;

const Activity = ({ className, activity }: ActivityProps) => {
    return (
        <div className={className}>
            <ActivityIcon>
                <Agenda />
            </ActivityIcon>
            <ActivityHeader>
                <ActivityType>{activity.type}</ActivityType>
                <ActivityDate>
                    {moment(activity.creationDate).format('D MMM YYYY')}&nbsp;at
                    &nbsp;{moment(activity.creationDate).format('h:MM A z')}
                </ActivityDate>
            </ActivityHeader>
            <ActivityTitle>{activity.title}</ActivityTitle>
            <ActivityNotes>{activity.notes}</ActivityNotes>
        </div>
    );
};

export default styled(Activity)`
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.07);
    padding: 1em 1em 1em 50px;
    margin-bottom: 2em;
    position: relative;
`;

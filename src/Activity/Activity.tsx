import dotProp from 'dot-prop';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { ChangedItems, OnChangeHandler } from '../Form';
import { Agenda } from '../Icon';
import { mapValidationErrors, ValidationErrors } from '../Validation';

import InlineEditableDate from '../Input/InlineEditable/InlineEditableDate';
import InlineEditableText from '../Input/InlineEditable/InlineEditableText';

export interface Activity {
    type: string;
    title: string;
    client?: string;
    notes: string;
    creationDate: Date;
    _id: string;
    dueDate?: Date;
}

interface UpdateActivityProps {
    className?: string;
    activity: Activity;
    validationSchema: Yup.ObjectSchema;
    onChange: OnChangeHandler;
    onRemove: () => void;
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
`;

const ActivityDueDate = styled.div`
    color: ${({ theme: { color } }) => color.gray110};
    font-weight: 500;
    font-size: 12px;
    display: flex;
    flex-direction: column;
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
    height: 15px;
    align-items: center;
    margin-bottom: 1em;
    justify-content: space-between;
`;

const ActivityBar = styled.div`
    margin: 1em 0;
`;

const ActivityToolBar = styled.div`
    display: flex;
    justify-content: flex-end;
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

const Activity = ({
    className,
    activity,
    validationSchema,
    onChange,
    onRemove,
}: UpdateActivityProps) => {
    const [inputValues, setInputValues] = React.useState<Activity>(activity);
    const [inputErrors, setInputErrors] = React.useState<ValidationErrors>(
        new Map()
    );

    React.useEffect(() => {
        setInputValues({ ...activity });
    }, [activity]);

    const onChangeInputField = async (
        field: string,
        value: boolean | number | string | Date | null
    ) => {
        const values = { ...inputValues };
        dotProp.set(values, field, value);
        setInputValues(values);

        validationSchema
            .validateAt(field, values)
            .then(_ => {
                const errors = new Map(inputErrors);
                errors.delete(field);
                setInputErrors(errors);
                onChange(
                    [{ field, value }] as ChangedItems,
                    { saveFields: true },
                    () => null
                );
            })
            .catch(error => {
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };
    return (
        <div className={className}>
            <ActivityIcon>
                <Agenda />
            </ActivityIcon>
            <ActivityHeader>
                <ActivityType>{activity.type}</ActivityType>
                <ActivityDate>
                    {moment(inputValues.creationDate).format('D MMM YYYY')}
                    &nbsp;at &nbsp;
                    {moment(inputValues.creationDate).format('h:MM A z')}
                </ActivityDate>
            </ActivityHeader>
            <ActivityTitle>
                <InlineEditableText
                    onChange={value => onChangeInputField('title', value)}
                    field="title"
                    validationSchema={validationSchema}
                    value={inputValues.title}
                />
            </ActivityTitle>
            <ActivityBar>
                <ActivityDueDate>
                    Due date
                    <InlineEditableDate
                        validationSchema={validationSchema}
                        field="dueDate"
                        onChange={value => {
                            if (value) {
                                onChangeInputField('dueDate', value.toDate());
                            } else {
                                onChangeInputField('dueDate', value);
                            }
                        }}
                        value={
                            inputValues.dueDate
                                ? moment(inputValues.dueDate)
                                : null
                        }
                    />
                </ActivityDueDate>
            </ActivityBar>

            <ActivityNotes>
                <InlineEditableText
                    onChange={value => onChangeInputField('notes', value)}
                    field="notes"
                    validationSchema={validationSchema}
                    value={inputValues.notes}
                    type="TEXTAREA"
                />
            </ActivityNotes>
        </div>
    );
};

export default styled(Activity)`
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.07);
    padding: 1em 1em 1em 50px;
    margin-bottom: 2em;
    position: relative;
    ${ActivityToolBar} {
        display: none;
    }
    &:hover {
        ${ActivityToolBar} {
            display: flex;
        }
    }
`;

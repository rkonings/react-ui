import dotProp from 'dot-prop';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import Button from '../Button/Button';
import TextButton from '../Button/TextButton';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import { ChangedItems, OnChangeHandler } from '../Form';
import { Agenda, Edit, Trash } from '../Icon';
import TextField from '../Input/TextField/TextField';
import { mapValidationErrors, ValidationErrors } from '../Validation';

export interface Activity {
    type: string;
    title: string;
    client?: string;
    notes: string;
    creationDate: Date;
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
    height: 15px;
    align-items: center;
    margin-bottom: 1em;
    justify-content: space-between;
`;

const ActivityFooter = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    margin-top: 2em;
    justify-content: flex-end;
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

const UpdateActivity = ({
    className,
    activity,
    validationSchema,
    onChange,
    onRemove,
}: UpdateActivityProps) => {
    const [editable, setEditable] = React.useState<boolean>(false);
    const [labelValues, setLabelValues] = React.useState<Activity>(activity);
    const [inputValues, setInputValues] = React.useState<Activity>(activity);
    const [inputErrors, setInputErrors] = React.useState<ValidationErrors>(
        new Map()
    );

    React.useEffect(() => {
        setInputValues({ ...activity });
        setLabelValues({ ...activity });
    }, [activity]);

    const onCancel = () => {
        setInputValues(activity);
        setInputErrors(new Map());
        setEditable(false);
    };

    const onSave = () => {
        validationSchema
            .validate(inputValues, { abortEarly: false })
            .then(() => {
                setInputErrors(new Map());
                const values = Object.entries(inputValues).map(
                    ([key, value]) => ({
                        field: key,
                        value,
                    })
                );
                onChange(values as ChangedItems, { saveFields: true }, () => {
                    // callback onChange
                    // switch to read mode
                    console.log(values);
                    setEditable(false);
                });
            })
            .catch(error => {
                console.log(error);
                const errors = mapValidationErrors(error);
                setInputErrors(errors);
            });
    };

    const onChangeInputField = async (
        field: string,
        value: boolean | number | string
    ) => {
        const values = { ...inputValues };
        dotProp.set(values, field, value);
        setInputValues(values);

        validationSchema
            .validateAt(field, values)
            .then(() => {
                const errors = new Map(inputErrors);
                errors.delete(field);
                setInputErrors(errors);
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
                {!editable && (
                    <ActivityToolBar>
                        <TextButton
                            size="s"
                            isIcon={true}
                            onClick={() => setEditable(true)}
                        >
                            <Edit />
                        </TextButton>
                        <TextButton
                            size="s"
                            isIcon={true}
                            onClick={() => onRemove()}
                        >
                            <Trash />
                        </TextButton>
                    </ActivityToolBar>
                )}
                <ActivityDate>
                    {moment(activity.creationDate).format('D MMM YYYY')}&nbsp;at
                    &nbsp;{moment(activity.creationDate).format('h:MM A z')}
                </ActivityDate>
            </ActivityHeader>
            <ActivityTitle>
                {editable ? (
                    <TextField
                        value={inputValues.title}
                        placeHolder="title"
                        onChange={e =>
                            onChangeInputField('title', e.currentTarget.value)
                        }
                        errorText={inputErrors.get('title')}
                    />
                ) : (
                    inputValues.title
                )}
            </ActivityTitle>

            <ActivityNotes>
                {editable ? (
                    <TextField
                        value={inputValues.notes}
                        placeHolder="notes"
                        onChange={e =>
                            onChangeInputField('notes', e.currentTarget.value)
                        }
                        errorText={inputErrors.get('notes')}
                    />
                ) : (
                    inputValues.notes
                )}
            </ActivityNotes>

            {editable && (
                <ActivityFooter>
                    <ButtonGroup>
                        <TextButton onClick={onCancel}>cancel</TextButton>
                        <Button onClick={onSave} type="primary">
                            Save
                        </Button>
                    </ButtonGroup>
                </ActivityFooter>
            )}
        </div>
    );
};

export default styled(UpdateActivity)`
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

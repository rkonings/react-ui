import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import Button from '../../Button/Button';
import TextButton from '../../Button/TextButton';
import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import { Edit } from '../../Icon';
import TextField from '../../Input/TextField/TextField';
import TextArea from '../TextArea';

interface InlineEditableText {
    className?: string;
    value: string;
    field: string;
    onChange: (value: string) => void;
    validationSchema: Yup.ObjectSchema;
    type?: 'TEXTFIELD' | 'TEXTAREA';
}

const EditButton = styled.div`
    margin-left: 1em;
`;

const InputWrapper = styled.div`
    width: 100%;
`;

const InputToolbar = styled.div`
    margin-top: 5px;
`;

export const Label = styled.div`
    display: flex;
    flex: grow;
`;

const InlineEditableText = ({
    className,
    value,
    validationSchema,
    field,
    onChange,
    type = 'TEXTFIELD',
}: InlineEditableText) => {
    const [isEditable, setIsEditable] = React.useState<boolean>(false);
    const [innerValue, setInnerValue] = React.useState<string>(value);
    const [error, setError] = React.useState<Yup.ValidationError | null>(null);

    const onCancel = () => {
        setIsEditable(false);
        setInnerValue(value);
        setError(null);
    };

    const onSave = () => {
        if (!error && innerValue !== value) {
            onChange(innerValue);
        }
        setIsEditable(false);
    };

    const onChangeInput = (value: string) => {
        setInnerValue(value);
        validationSchema
            .validateAt(field, { [field]: value })
            .then(_ => setError(null))
            .catch(error => setError(error));
    };

    const inputProps = {
        autoFocus: true,
        value: innerValue,
        grow: true,
        errorText: (error && error.message) || undefined,
    };

    return (
        <div
            onClick={() => {
                if (!isEditable) {
                    setIsEditable(true);
                }
            }}
            className={className}
        >
            {isEditable ? (
                <InputWrapper>
                    {type === 'TEXTFIELD' && (
                        <TextField
                            {...inputProps}
                            onChange={e => onChangeInput(e.currentTarget.value)}
                        />
                    )}
                    {type === 'TEXTAREA' && (
                        <TextArea
                            {...inputProps}
                            onChange={e => onChangeInput(e.currentTarget.value)}
                        />
                    )}

                    <InputToolbar>
                        <ButtonGroup size="s">
                            <TextButton onClick={() => onCancel()}>
                                cancel
                            </TextButton>
                            <Button type="primary" onClick={() => onSave()}>
                                Save
                            </Button>
                        </ButtonGroup>
                    </InputToolbar>
                </InputWrapper>
            ) : (
                <React.Fragment>
                    <Label>{innerValue}</Label>
                    <EditButton>
                        <Edit />
                    </EditButton>
                </React.Fragment>
            )}
        </div>
    );
};

export default styled(InlineEditableText)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 10px;
    margin-left: -10px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0);

    ${EditButton} {
        margin-left: 1em;
        opacity: 0;
    }

    &:hover {
        background: ${({ theme: { color } }) => color.gray10};
        border-bottom: 1px solid ${({ theme: { color } }) => color.gray60};

        ${EditButton} {
            opacity: 1;
        }
    }
`;

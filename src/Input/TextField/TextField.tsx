import * as React from 'react';
import styled from 'styled-components';
import Theme from '../../interfaces/Theme';

const DEFAULT_TYPE = 'text';

interface TextFieldProps {
    inputType?: string;
    className?: string;
    placeHolder?: string;
    value?: string;
    error?: string;
    helperText?: string;
    width?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    theme: Theme;
    name?: string;
    onChange?(e: React.FormEvent<HTMLInputElement>): void;
    onBlur?(e: React.FormEvent<HTMLInputElement>): void;
}

const HelperText = styled.div``;
const ErrorText = styled.div``;

const TextField = ({className, value, placeHolder, onChange, onBlur, name,
    helperText, error, autoFocus, disabled, inputType = DEFAULT_TYPE}: TextFieldProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (autoFocus && inputRef && inputRef.current) {
          inputRef.current.focus();
        }
      }, [autoFocus]);

    return (
        <div className={className}>
            <label>
                <input
                    name={name}
                    type={inputType}
                    ref={inputRef}
                    placeholder={placeHolder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                />
            </label>
            {helperText && !error && <HelperText>{helperText}</HelperText>}
            {error && <ErrorText>{error}</ErrorText>}
        </div>
    );

};

const BaseStyle = ({theme: {input: { textField }}, error = false, width = '300px', disabled}: TextFieldProps) => {
    const type = 'default';

    return `
        box-sizing: border-box;
        width: ${width};
        ${ErrorText} {
            color: ${textField[type].error.errorText};
            font-size: 14px;
            padding-top: 4px;
        }

        ${HelperText} {
            color: ${textField[type].default.helperText};
            font-size: 14px;
            padding-top: 4px;
        }

        input {
            box-sizing: border-box;
            width: 100%;
            font-size: 14px;
            padding: 1em;
            transition : border 500ms ease-out;

            &::-webkit-input-placeholde { color: ${textField[type].default.placeholderColor}; }
            &::-moz-placeholder { color: ${textField[type].default.placeholderColor}; }
            &:-ms-input-placeholder { color: ${textField[type].default.placeholderColor}; }
            &::placeholder {
                transition : opacity 200ms ease-out;
                opacity:1;
                color: ${textField[type].default.placeholderColor};
            }
            &::-ms-input-placeholder { color: ${textField[type].default.placeholderColor}; }
        }

    `;

};

const StyledTextField = styled(TextField)`

    ${BaseStyle};

    ${({theme: {input: { textField }}, error = false, disabled}) => {

        if (disabled) {
            return ``;
        }

        const type = 'default';
        const borderColor = error ? textField[type].error.borderColor : textField[type].default.borderColor;
        return `
            input {
                color: ${textField[type].default.color};
                border: ${textField.borderSize} solid ${borderColor};
                &:hover {
                    color: ${textField[type].hover.color};
                    border: ${textField.borderSize} solid ${textField[type].hover.borderColor};
                }

                &:focus {
                    border: ${textField.borderSize} solid ${textField[type].focus.borderColor};
                    color: ${textField[type].focus.color};
                    outline: none;

                    &::-webkit-input-placeholde { opacity: 0;}
                    &::-moz-placeholder { opacity: 0;}
                    &:-ms-input-placeholder { opacity: 0;}
                    &::placeholder { opacity: 0;}
                    &::-ms-input-placeholder { opacity: 0;}
                }
            }

        `;
    }};

`;

export default StyledTextField;

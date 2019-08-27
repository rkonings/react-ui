import * as React from 'react';
import styled from 'styled-components';

interface TextFieldProps {
    className?: string;
    placeHolder?: string;
    value?: string;
    error?: string;
    helperText?: string;
    width?: number;
    disabled?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    onChange?(e: React.FormEvent<HTMLInputElement>): void;
}

const HelperText = styled.div`

`;

const ErrorText = styled.div``;

const TextField = ({className, value, placeHolder, onChange, helperText, error, autoFocus}: TextFieldProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (autoFocus && inputRef && inputRef.current) {
          inputRef.current.focus();
        }
      }, [autoFocus]);

    return (
        <div className={className}>
            <label>
                <input type="text" ref={inputRef} placeholder={placeHolder} value={value} onChange={onChange}  />
            </label>
            {helperText && !error && <HelperText>{helperText}</HelperText>}
            {error && <ErrorText>{error}</ErrorText>}
        </div>
    );

};

const StyledTextField = styled(TextField)`

        ${({theme: {input: { textField }}, error = false}) => {
            const type = 'default';
            const borderColor = error ? textField[type].error.borderColor : textField[type].default.borderColor;
            return `

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

                input[type="text"] {
                    font-size: 14px;
                    padding: 1em;
                    width: 300px;
                    color: ${textField[type].default.color};
                    border: ${textField.borderSize} solid ${borderColor};
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

                    &:hover {
                        color: ${textField[type].hover.color};
                        border: ${textField.borderSize} solid ${textField[type].hover.borderColor};
                    }

                    &:focus {
                        color: ${textField[type].focus.color};
                        border: ${textField.borderSize} solid ${textField[type].focus.borderColor};
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

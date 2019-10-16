import * as React from 'react';
import styled from 'styled-components';
import Theme from '../../interfaces/Theme';
import { Size  } from '../../interfaces/Theme';
import { ErrorText, HelperText } from '../Core';

const DEFAULT_TYPE = 'text';
type TextFieldStyle = 'default' | 'outlined';

interface TextFieldProps extends HelperText, ErrorText {
    inputType?: string;
    className?: string;
    placeHolder?: string;
    value?: string;
    width?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    theme: Theme;
    name?: string;
    size?: Size;
    style?: TextFieldStyle;
    onChange?(e: React.FormEvent<HTMLInputElement>): void;
    onBlur?(e: React.FormEvent<HTMLInputElement>): void;
    onFocus?(e: React.FormEvent<HTMLInputElement>): void;
}

const TextField = ({className, value, placeHolder, onChange, onBlur, onFocus, name,
    helperText, errorText, autoFocus, disabled, inputType = DEFAULT_TYPE}: TextFieldProps) => {
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
                    onFocus={onFocus}
                    disabled={disabled}
                />
            </label>
            {helperText && !errorText && <HelperText>{helperText}</HelperText>}
            {errorText && <ErrorText>{errorText}</ErrorText>}
        </div>
    );

};

const BaseStyle = ({theme: {input: { textField }}, width = '300px', disabled, size = 'm'}: TextFieldProps) => {
    const type = 'default';

    return `
        box-sizing: border-box;
        width: ${width};

        input {
            box-sizing: border-box;
            width: 100%;
            font-size: ${textField.size[size]}px;
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

    ${({theme: {input: { textField, error }}, errorText = false, disabled, style = 'default'}) => {

        if (disabled) {
            return ``;
        }

        const type = 'default';
        const borderColor = errorText ? error.color : textField[type].default.borderColor;

        let border = 'border-bottom';
        if (style === 'outlined') {
            border = 'border';
        }

        return `
            input {
                border: none;
                color: ${textField[type].default.color};
                ${border}: ${textField.borderSize} solid ${borderColor};
                &:hover {
                    color: ${textField[type].hover.color};
                    ${border}: ${textField.borderSize} solid ${textField[type].hover.borderColor};
                }

                &:focus {
                    ${border}: ${textField.borderSize} solid ${textField[type].focus.borderColor};
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

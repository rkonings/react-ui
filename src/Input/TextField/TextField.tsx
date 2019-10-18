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
    readOnly?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    theme: Theme;
    textAlign?: 'left' | 'right';
    name?: string;
    size?: Size;
    grow?: boolean;
    prefix?: string | JSX.Element;
    postfix?: string | JSX.Element;
    style?: TextFieldStyle;
    onChange?(e: React.FormEvent<HTMLInputElement>): void;
    onBlur?(e: React.FormEvent<HTMLInputElement>): void;
    onFocus?(e: React.FormEvent<HTMLInputElement>): void;
}

const Prefix = styled.span`
    display: flex;
    align-items: center;
    margin-right: 5px;
`;

const Postfix = styled.span`
    display: flex;
    align-items: center;
    margin-left: 5px;
`;

interface Label {
    focus: boolean;
    disabled?: boolean;
    errorText?: string;
    _style?: TextFieldStyle;
}
const Label = styled.label<Label>`

    display: flex;
    flex-direction: row;
    align-items: center;
    transition : border 500ms ease-out;

    ${({theme: {input: { textField, error }}, errorText = false, disabled, _style = 'default'}) => {
         let border = 'border-bottom';
        if (_style === 'outlined') {
            border = 'border';
        }

        const borderColor = errorText ? error.color : textField.default.hover.borderColor;

        return disabled ? null : `
            &:hover {
                ${border}: ${textField.borderSize} solid ${borderColor};
                color: ${textField.default.hover.color};
            }
        `;
    }}

    ${({theme: {input: { textField, error }}, errorText = false, focus, _style = 'default'}) => {

        const type = 'default';
        const state = focus ? 'focus' : 'default';
        const borderColor = errorText ? error.color : textField[type][state].borderColor;

        let border = 'border-bottom';
        if (_style === 'outlined') {
            border = 'border';
        }

        return `
            ${border}: ${textField.borderSize} solid ${borderColor};
        `;
    }}

`;

const TextField = ({className, value, placeHolder, onChange, onBlur, onFocus, name, style, readOnly,
    helperText, errorText, autoFocus, disabled, inputType = DEFAULT_TYPE, prefix, postfix}: TextFieldProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [focus, setFocus] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (autoFocus && inputRef && inputRef.current) {
          inputRef.current.focus();
        }
      }, [autoFocus]);

    const onFocusHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setFocus(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const onBlurHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setFocus(false);
        if (onBlur) {
            onBlur(e);
        }
    };

    return (
        <div className={className}>
            <Label focus={focus} disabled={disabled} errorText={errorText} _style={style}>
                {prefix && (
                    <Prefix>
                        {prefix}
                    </Prefix>
                )}
                <input
                    readOnly={readOnly}
                    name={name}
                    type={inputType}
                    ref={inputRef}
                    placeholder={placeHolder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    disabled={disabled}
                />
                {postfix && (
                    <Postfix>
                        {postfix}
                    </Postfix>
                )}
            </Label>
            {helperText && !errorText && <HelperText>{helperText}</HelperText>}
            {errorText && <ErrorText>{errorText}</ErrorText>}
        </div>
    );

};

const BaseStyle = ({theme: {input: { textField }}, width: _width = '300px', grow: _grow = false, textAlign = 'left',
prefix = false, postfix = false, size = 'm'}: TextFieldProps) => {
    const type = 'default';
    const grow = _grow ? 'flex: 1;' : '';
    const width = !_grow ? 'width: ' + _width + ';' : '';
    return `
        box-sizing: border-box;
        ${width}
        ${grow}
        font-size: ${textField.size[size]}px;

        input {
            text-align: ${textAlign};
            display: flex;
            flex: 1;
            width: 100%;
            box-sizing: border-box;
            font-size: ${textField.size[size]}px;
            padding: 1em;
            ${postfix ? 'padding-right: 0' : ''};
            ${prefix ? 'padding-left: 0' : ''};

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

    ${({theme: {input: { textField }}}) => {
        const type = 'default';

        return `
            input {

                &:read-only {
                    cursor: default;
                }

                border: none;
                color: ${textField[type].default.color};

                &:focus {

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

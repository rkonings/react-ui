import * as React from 'react';
import styled from 'styled-components';
import {
    BaseStyle,
    InputProps,
    Label,
    Postfix,
    Prefix,
    Style,
    Wrapper,
} from '../';
import { ErrorText, HelperText } from '../Core';

const DEFAULT_TYPE = 'text';

export interface TextFieldProps extends InputProps, HelperText, ErrorText {
    onChange?(e: React.FormEvent<HTMLInputElement>): void;
    onBlur?(e: React.FormEvent<HTMLInputElement>): void;
    onFocus?(e: React.FormEvent<HTMLInputElement>): void;
    onKeyDown?(e: React.KeyboardEvent<HTMLInputElement>): void;
}

const TextField = ({
    className,
    value,
    placeHolder,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    name,
    style,
    readOnly,
    helperText,
    errorText,
    autoFocus,
    disabled,
    inputType = DEFAULT_TYPE,
    prefix,
    postfix,
    label,
}: TextFieldProps) => {
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
            {label && <Label>{label}</Label>}
            <Wrapper
                focus={focus}
                disabled={disabled}
                errorText={errorText}
                _style={style}
            >
                {prefix && <Prefix>{prefix}</Prefix>}
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
                    onKeyDown={onKeyDown}
                />
                {postfix && <Postfix>{postfix}</Postfix>}
            </Wrapper>
            {helperText && !errorText && <HelperText>{helperText}</HelperText>}
            {errorText && <ErrorText>{errorText}</ErrorText>}
        </div>
    );
};

const StyledTextField = styled(TextField)`
    ${BaseStyle};
    ${Style};
`;

export default StyledTextField;

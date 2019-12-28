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

export interface TextAreaProps extends InputProps, HelperText, ErrorText {
    onChange?(e: React.FormEvent<HTMLTextAreaElement>): void;
    onBlur?(e: React.FormEvent<HTMLTextAreaElement>): void;
    onFocus?(e: React.FormEvent<HTMLTextAreaElement>): void;
    onKeyDown?(e: React.KeyboardEvent<HTMLTextAreaElement>): void;
}

const TextArea = ({
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
    prefix,
    postfix,
    label,
}: TextAreaProps) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const [focus, setFocus] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (autoFocus && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const onFocusHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setFocus(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const onBlurHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
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
                <textarea
                    readOnly={readOnly}
                    name={name}
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

const StyledTextArea = styled(TextArea)`
    ${BaseStyle};
    ${Style};
`;

export default StyledTextArea;

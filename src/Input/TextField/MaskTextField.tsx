import React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import TextField, { TextFieldProps } from './TextField';

type MaskFunction = (rawValue: string) =>  Array<RegExp|string>;

interface MaskTextField extends TextFieldProps {
    mask?: Array<RegExp|string> | MaskFunction;
    guide?: boolean;
    pipe?: ((conformedValue: string) => string | false | {
        value: string;
        indexesOfPipedChars: number[];
    }) | undefined;
}

const MaskTextField = ({onChange, onBlur, onFocus, onKeyDown, guide = false, pipe, mask, ...props}: MaskTextField) => {

    return (
        <MaskedInput
            mask={mask}
            onChange={onChange}
            guide={guide}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            pipe={pipe}
            render={(ref, maskProps) => {
                return (
                    <TextField ref={ref} {...props} {...maskProps}/>
                );
            }}
        />
    );

};

export default styled(MaskTextField)`

`;

import { storiesOf } from '@storybook/react';
import React from 'react';
import MaskTextField from '../src/Input/TextField/MaskTextField';

storiesOf('MaskTextField', module)
.add('phone number', () => {
    return (
        <MaskTextField
            mask={['+', '3', '1', /[1-9]/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/]}
            placeHolder={`+31 06 234 534 23`}
        />
    );
})
.add('time', () => {

    const maskFunction = (rawValue: string) => {
        if (parseInt(rawValue[0], 10) > 2) {
            return ['0', /\d/, ':', /[0-5]/, /[0-9]/];
        }

        return [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];

    };
    return (
        <MaskTextField
            size="xl"
            mask={maskFunction}
            placeHolder={`00:00`}
        />
    );
});

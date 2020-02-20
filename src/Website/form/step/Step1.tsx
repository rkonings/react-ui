import React from 'react';
import styled from 'styled-components';

import { Step } from '../';
import { InputField } from '../../../Form';
import TextField from '../../../Input/TextField/TextField';

export default styled(({ className, values, errors, onChange, id }: Step) => {
    return (
        <div className={className}>
            {id}
            <InputField>
                <TextField
                    value={values.zipcode}
                    width="200px"
                    placeHolder="Postcode"
                    onChange={e => onChange('zipcode', e.currentTarget.value)}
                    errorText={errors.get('zipcode')}
                />
                <TextField
                    value={values.streetNumber}
                    width="200px"
                    placeHolder="Street number"
                    onChange={e =>
                        onChange('streetNumber', e.currentTarget.value)
                    }
                    errorText={errors.get('streetNumber')}
                />
            </InputField>
        </div>
    );
})``;

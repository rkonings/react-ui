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
                    value={values.externalUnitLocation}
                    width="200px"
                    placeHolder="External Unit location"
                    onChange={e =>
                        onChange('externalUnitLocation', e.currentTarget.value)
                    }
                    errorText={errors.get('externalUnitLocation')}
                />
            </InputField>
        </div>
    );
})``;

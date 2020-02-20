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
                    value={values.spaces}
                    width="200px"
                    placeHolder="Spaces"
                    onChange={e => onChange('spaces', e.currentTarget.value)}
                    errorText={errors.get('spaces')}
                />
            </InputField>
        </div>
    );
})``;

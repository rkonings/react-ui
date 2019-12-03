import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import ButtonGroup from '../src/ButtonGroup/ButtonGroup';

import Button from '../src/Button/Button';
import TextButton from '../src/Button/TextButton';
import TextField from '../src/Input/TextField/TextField';
import Popover from '../src/Popover/Popover';

const InputControl = styled.div`
    padding-bottom: 10px;
`;

storiesOf('Popover', module)
.add('default', () => {
    return (
        <Popover
            link={<Button>edit</Button>}
        >
            {(setOpen) => (
                <React.Fragment>
                    <InputControl>
                        <TextField style="outlined" grow={true} placeHolder="Firstname" />
                    </InputControl>
                    <InputControl>
                        <TextField style="outlined" grow={true} placeHolder="LastName" />
                    </InputControl>
                    <ButtonGroup>
                        <TextButton onClick={() => setOpen(false)}>Cancel</TextButton>
                        <Button onClick={() => setOpen(false)} type="primary">Save</Button>
                    </ButtonGroup>
                </React.Fragment>
            )}
        </Popover>
    );
});

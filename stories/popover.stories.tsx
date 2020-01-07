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

    ${TextField} {
        input {
            background: none;
        }
    }
`;

const PopoverFooter = styled.div`
    padding-top: 1em;
    display: flex;
    justify-content: flex-end;
`;

storiesOf('Popover', module).add('default', () => {
    return (
        <Popover link={<Button>edit</Button>}>
            {setOpen => (
                <React.Fragment>
                    <InputControl>
                        <TextField width="200px" placeHolder="Firstname" />
                    </InputControl>
                    <InputControl>
                        <TextField width="200px" placeHolder="LastName" />
                    </InputControl>
                    <PopoverFooter>
                        <ButtonGroup>
                            <TextButton onClick={() => setOpen(false)}>
                                Cancel
                            </TextButton>
                            <Button
                                onClick={() => setOpen(false)}
                                type="primary"
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </React.Fragment>
            )}
        </Popover>
    );
});

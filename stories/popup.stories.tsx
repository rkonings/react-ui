import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../src/Button/Button';
import TextButton from '../src/Button/TextButton';
import ButtonGroup from '../src/ButtonGroup/ButtonGroup';

import Popup, {
    PopupContent,
    PopupFooter,
    PopupHeader,
} from '../src/Popup/Popup';

storiesOf('Popup', module).add('default', () => {
    const width = text('width', '300px');
    const height = text('height', '300px');

    return (
        <Popup width={width} height={height} link={<Button>Popup</Button>}>
            {setOpen => (
                <React.Fragment>
                    <PopupHeader>Reset password</PopupHeader>
                    <PopupContent>Hoi</PopupContent>
                    <PopupFooter>
                        <ButtonGroup>
                            <TextButton onClick={() => setOpen(false)}>
                                cancel
                            </TextButton>
                            <Button
                                type="primary"
                                onClick={() => setOpen(false)}
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    </PopupFooter>
                </React.Fragment>
            )}
        </Popup>
    );
});

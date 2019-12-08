import { boolean, text } from '@storybook/addon-knobs';
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
    const clickAway = boolean('clickaway', true);

    return (
        <Popup
            width={width}
            clickAway={clickAway}
            link={<Button>Popup</Button>}
        >
            {setOpen => (
                <React.Fragment>
                    <PopupHeader>Store client</PopupHeader>
                    <PopupContent>Are u sure to save this client?</PopupContent>
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

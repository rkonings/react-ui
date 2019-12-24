import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../src/Button/Button';
import TextButton from '../src/Button/TextButton';
import ButtonGroup from '../src/ButtonGroup/ButtonGroup';

import Popup, {
    PopupContent,
    PopupCore,
    PopupFooter,
    PopupHeader,
} from '../src/Popup/Popup';

storiesOf('Popup', module)
    .add('default', () => {
        const width = text('width', '300px');
        const clickAway = boolean('clickaway', true);
        const position = select('Position', ['BOTTOM', 'CENTER'], 'CENTER');

        return (
            <Popup
                width={width}
                clickAway={clickAway}
                link={<Button>Popup</Button>}
                position={position}
            >
                {setOpen => (
                    <React.Fragment>
                        <PopupHeader>Store client</PopupHeader>
                        <PopupContent>
                            Are u sure to save this client?
                        </PopupContent>
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
    })
    .add('no button', () => {
        const width = text('width', '300px');
        const clickAway = boolean('clickaway', true);
        const isOpen = boolean('isOpen', true);
        const position = select('Position', ['BOTTOM', 'CENTER'], 'CENTER');

        return (
            <Popup
                position={position}
                width={width}
                isOpen={isOpen}
                clickAway={clickAway}
            >
                {setOpen => (
                    <React.Fragment>
                        <PopupHeader>Store client</PopupHeader>
                        <PopupContent>
                            Are u sure to save this client?
                        </PopupContent>
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
    })
    .add('popup core', () => {
        const width = text('width', '300px');
        const clickAway = boolean('clickaway', true);
        const isOpen = boolean('isOpen', true);
        const position = select('Position', ['BOTTOM', 'CENTER'], 'CENTER');

        return (
            <PopupCore position={position} width={width} isOpen={isOpen}>
                <React.Fragment>
                    <PopupHeader>Store client</PopupHeader>
                    <PopupContent>Are u sure to save this client?</PopupContent>
                    <PopupFooter>
                        <ButtonGroup>
                            <TextButton onClick={() => null}>cancel</TextButton>
                            <Button type="primary" onClick={() => null}>
                                Save
                            </Button>
                        </ButtonGroup>
                    </PopupFooter>
                </React.Fragment>
            </PopupCore>
        );
    });

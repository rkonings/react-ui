import React from 'react';
import styled from 'styled-components';
import { Button, TextButton } from '../Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Popup, { PopupContent, PopupFooter, PopupHeader } from '../Popup/Popup';

interface FilterPopup {
    className?: string;
    width?: string;
}

const FilterPopup = ({ className, width }: FilterPopup) => {
    return (
        <div className={className}>
            <Popup
                width={width}
                clickAway={true}
                link={<Button>Filter</Button>}
            >
                {setOpen => (
                    <React.Fragment>
                        <PopupHeader>What do u want to filter?</PopupHeader>
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
                                    Filter
                                </Button>
                            </ButtonGroup>
                        </PopupFooter>
                    </React.Fragment>
                )}
            </Popup>
        </div>
    );
};

export default styled(FilterPopup)``;

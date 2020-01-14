import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import TextButton from '../Button/TextButton';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Popover, { PopoverFooter } from './Popover';

interface DeletePopover {
    link: JSX.Element;
    onDelete: () => void;
    children: JSX.Element | string;
    className?: string;
}

const Content = styled.div`
    width: 200px;
    font-size: 14px;
`;

const DeletePopover = ({
    link,
    onDelete,
    children,
    className,
}: DeletePopover) => {
    const deleteHandler = () => {
        onDelete();
    };

    return (
        <Popover className={className} link={link}>
            {close => (
                <Content>
                    {children}
                    <PopoverFooter>
                        <ButtonGroup>
                            <Button
                                onClick={() => {
                                    deleteHandler();
                                    close();
                                }}
                                type="secondairy"
                            >
                                Delete
                            </Button>
                            <TextButton onClick={() => close()}>
                                Cancel
                            </TextButton>
                        </ButtonGroup>
                    </PopoverFooter>
                </Content>
            )}
        </Popover>
    );
};

export default styled(DeletePopover)`
    font-size: 14px;
`;

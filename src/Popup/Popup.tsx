import React from 'react';
import styled from 'styled-components';

interface Popup {
    className?: string;
    width?: string;
    height?: string;
    clickAway?: boolean;
    children: (
        close: React.Dispatch<React.SetStateAction<boolean>>
    ) => string | JSX.Element | JSX.Element[];
    link: JSX.Element;
}

export const PopupHeader = styled.div`
    background: ${({ theme: { color } }) => color.primary};
    box-sizing: border-box;
    font-weight: 400;
    font-size: 18px;
    padding: 1em;
    width: 100%;
    display: flex;
    align-items: center;
    color: #fff;
`;
export const PopupFooter = styled.div`
    align-self: flex-end;
`;

export const PopupContent = styled.div`
    flex-grow: 1;
    box-sizing: border-box;
    padding: 1em;
`;

const StyledClickAway = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.04);
`;

interface PopupWindow {
    width?: string;
    height?: string;
}

const PopupWindow = styled.div<PopupWindow>`
    width: ${({ width = '50%' }) => width};
    height: ${({ height = '50%' }) => height};
    z-index: 1;
    display: flex;
    flex-direction: column;
    background: ${({ theme: { color } }) => color.gray10};
`;

const Popup = ({ className, link, children, width, height }: Popup) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className={className}>
            {React.cloneElement(link, { onClick: () => setOpen(!open) })}
            {open && (
                <Overlay>
                    {clickAway && (
                        <StyledClickAway onClick={() => setOpen(false)} />
                    )}
                    <PopupWindow width={width} height={height}>
                        {children(setOpen)}
                    </PopupWindow>
                </Overlay>
            )}
        </div>
    );
};

export default styled(Popup)``;

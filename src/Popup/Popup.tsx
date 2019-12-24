import useFocusTrap from '@charlietango/use-focus-trap';
import React from 'react';
import styled from 'styled-components';

export type PopupPosition = 'BOTTOM' | 'CENTER';

interface Popup {
    className?: string;
    width?: string;
    isOpen?: boolean;
    height?: string;
    clickAway?: boolean;
    position?: PopupPosition;
    children: (
        close: React.Dispatch<React.SetStateAction<boolean>>
    ) => string | JSX.Element | JSX.Element[];
    link?: JSX.Element;
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
    padding: 2em 1em 3em 1em;
    color: ${({ theme: { color } }) => color.black};
`;

const StyledClickAway = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
`;

const Overlay = styled.div<{ position: PopupPosition }>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    display: flex;

    ${({ position = 'CENTER' }) => {
        if (position === 'CENTER') {
            return `
                align-items: center;
                justify-content: center;
            `;
        } else if (position === 'BOTTOM') {
            return `
                align-items: flex-end;
                justify-content: center;
            `;
        }

        return '';
    }}

    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
`;

interface PopupWindow {
    width?: string;
    height?: string;
}

const PopupWindow = styled.div<PopupWindow>`
    width: ${({ width = '50%' }) => width};
    ${({ height }) => (height ? `height: ${height}` : '')};
    z-index: 1;
    display: flex;
    flex-direction: column;
    background: ${({ theme: { color } }) => color.gray10};
`;

interface PopupCore {
    width?: string;
    height?: string;
    isOpen?: boolean;
    clickAway?: () => void;
    children: JSX.Element;
    position?: PopupPosition;
}

export const PopupCore = ({
    clickAway,
    width,
    height,
    children,
    position = 'CENTER',
}: PopupCore) => {
    const focusTrap = useFocusTrap();
    return (
        <Overlay position={position}>
            {clickAway && <StyledClickAway onClick={() => clickAway()} />}
            <PopupWindow ref={focusTrap} width={width} height={height}>
                {children}
            </PopupWindow>
        </Overlay>
    );
};

const Popup = ({
    className,
    link,
    children,
    width,
    height,
    isOpen = false,
    clickAway,
    position = 'CENTER',
}: Popup) => {
    const [open, setOpen] = React.useState();
    const focusTrap = useFocusTrap();

    React.useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <div className={className}>
            {link &&
                React.cloneElement(link, { onClick: () => setOpen(!open) })}
            {open && (
                <Overlay position={position}>
                    {clickAway && (
                        <StyledClickAway onClick={() => setOpen(false)} />
                    )}
                    <PopupWindow ref={focusTrap} width={width} height={height}>
                        {children(setOpen)}
                    </PopupWindow>
                </Overlay>
            )}
        </div>
    );
};

export default styled(Popup)``;

import React from 'react';
import styled, { css } from 'styled-components';
import { usePortal } from '../Portal/Portal';

interface Popover {
    className?: string;
    children: (
        toggle: (open?: boolean) => void
    ) => string | JSX.Element | JSX.Element[];
    link:
        | ((openPortal: (e: React.MouseEvent) => void) => JSX.Element)
        | JSX.Element;
}

export const PopoverFooter = styled.div`
    padding-top: 1em;
    display: flex;
    justify-content: flex-end;
`;

const StyledClickAway = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
`;

const Content = styled.div<{ domRect?: DOMRect | ClientRect | null }>`
    ${({ domRect }) => {
        if (domRect) {
            return css`
                left: ${domRect.left + domRect.width * 0.5}px;
                top: ${domRect.top + domRect.height}px;
            `;
        }

        return '';
    }}

    position: absolute;
    transform: translate(-50%, 0);
    margin-top: 20px;
    box-sizing: border-box;
    padding: 1em;
    background: ${({ theme: { color } }) => color.gray10};
    border: 1px solid ${({ theme: { color } }) => color.gray40};
    z-index: 999;

    ::after {
        content: '';
        position: absolute;
        pointer-events: none;
        clip-path: polygon(100% 100%, 0px 100%, 100% 0px);
        border-top-left-radius: 100%;
        width: 20px;
        height: 20px;
        background-color: inherit;
        transform: rotate(-135deg);
        top: -10px;
        left: calc(50% - 10px);
        border-width: 1px;
        border-style: solid;
        border-color: ${({ theme: { color } }) => color.gray40};
        border-image: initial;
    }
`;

const Popover = ({ className, children, link }: Popover) => {
    // const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);
    const { open, Portal, close } = usePortal();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const closePortal = () => {
        setIsOpen(false);
        close();
    };

    const openPortal = () => {
        setIsOpen(true);
        open(
            <React.Fragment>
                <StyledClickAway onClick={() => closePortal()} />
                <Content
                    domRect={ref.current && ref.current.getBoundingClientRect()}
                >
                    {children(closePortal)}
                </Content>
            </React.Fragment>
        );
    };

    const getLink = () => {
        if (typeof link === 'function') {
            return link(openPortal);
        } else {
            return React.cloneElement(link, {
                onClick: openPortal,
            });
        }
    };

    return (
        <div ref={ref} className={className}>
            {getLink()}
            {isOpen && <Portal />}
        </div>
    );
};

export default styled(Popover)`
    position: relative;
`;

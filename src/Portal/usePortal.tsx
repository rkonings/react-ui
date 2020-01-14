import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    children: ReactNode;
    onClose: () => void;
}

export default () => {
    const portal = useRef<HTMLDivElement>(document.createElement('div'));
    let onCloseHandler: (() => void) | null = null;

    const Portal = useCallback(
        ({ children, onClose }: PortalProps) => {
            onCloseHandler = onClose;
            return createPortal(children, portal.current);
        },
        [portal]
    );

    const handleResize = () => {
        if (onCloseHandler) {
            onCloseHandler();
            onCloseHandler = null;
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.appendChild(portal.current);
    }, []);

    return {
        Portal,
    };
};

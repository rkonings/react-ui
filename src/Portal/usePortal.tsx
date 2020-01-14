import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default () => {
    const portal = useRef<HTMLDivElement>(document.createElement('div'));
    const [content, setContent] = useState<JSX.Element | null>(null);

    const open = (value: JSX.Element | null) => {
        setContent(value);
    };
    let onCloseHandler: (() => void) | null = null;

    const Portal = () => {
        return createPortal(content, portal.current);
    };
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

    const close = () => {
        open(null);
    };

    return {
        open,
        close,
        Portal,
        isOpen: content !== null,
    };
};

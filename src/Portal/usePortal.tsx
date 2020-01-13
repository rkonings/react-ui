import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default () => {
    const portal = useRef<HTMLDivElement>(document.createElement('div'));
    const [content, setContent] = useState<JSX.Element | null>(null);
    const open = setContent;

    const Portal = useCallback(() => {
        return createPortal(content, portal.current);
    }, [content]);

    const handleResize = () => {
        setContent(null);
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

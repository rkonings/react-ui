import React from 'react';
import _usePortal from 'react-useportal';

const useModal = () => {
    const {
        isOpen,
        togglePortal,
        closePortal,
        Portal,
        openPortal,
    } = _usePortal({});

    const handleResize = () => {
        closePortal();
    };

    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        Portal,
        togglePortal,
        closePortal,
        isOpen,
        openPortal,
    };
};

interface PortalContext {
    // tslint:disable-next-line: no-any
    Portal: any;
    togglePortal: (e?: React.MouseEvent) => void;
    closePortal: (e?: React.MouseEvent) => void;
    isOpen: boolean;
    openPortal: (e?: React.MouseEvent) => void;
}

export const PortalContext = React.createContext<PortalContext>(
    {} as PortalContext
);

interface Portal {
    children: JSX.Element | JSX.Element[];
}

export const PortalProvider = ({ children }: Portal) => {
    const modal = useModal();

    return (
        <PortalContext.Provider value={modal}>
            {children}
        </PortalContext.Provider>
    );
};

export const usePortal = () => {
    return React.useContext(PortalContext);
};

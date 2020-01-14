import React from 'react';
import _usePortal from './usePortal';

interface PortalContext {
    open: (value: JSX.Element | null) => void;
    close: () => void;
    Portal: () => React.ReactPortal;
    isOpen: boolean;
}

export const PortalContext = React.createContext<PortalContext>(
    {} as PortalContext
);

interface Portal {
    children: JSX.Element | JSX.Element[];
}

export const PortalProvider = ({ children }: Portal) => {
    const portal = _usePortal();

    return (
        <PortalContext.Provider value={portal}>
            {children}
        </PortalContext.Provider>
    );
};

export const usePortal = () => {
    return React.useContext(PortalContext);
};

import React from 'react';
import styled from 'styled-components';

type TabType = 'minimal' | 'default';

interface Tab {
    className?: string;
    children: JSX.Element[] | JSX.Element;
    active: string;
    type?: TabType;
}

interface TabContent {
    label: string;
    id: string;
}

export const TabContent = styled.div<TabContent>`
    padding: 2em 1em;
`;

const TabNavigation = styled.div<{ type?: TabType }>`
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid ${({ theme: { color } }) => color.gray50};
    height: 51px;
`;
const TabNavigationItem = styled.div<{ active?: boolean; type?: TabType }>`
    cursor: pointer;
    min-width: 120px;
    padding: 0 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    text-align: center;
    height: 50px;

    ${({ type, theme: { color }, active }) => {
        if (type === 'minimal') {
            const borderBottom = active
                ? `border-bottom: 5px solid ${color.primary};`
                : 'border-bottom: 0;';

            const textColor = active ? `color: ${color.primary}` : '';
            return `
                ${textColor};
                ${borderBottom}
            `;
        } else {
            const isActive = active
                ? 'border-bottom: 1px solid #ffffff;'
                : 'border-bottom: 0;';

            const background = active ? '#ffffff' : color.gray10;

            return `
                border: 1px solid ${color.gray50};
                border-left: 0;
                ${isActive}
                background: ${background};

                &:first-child {
                    border-left: 1px solid ${color.gray50};
                }
            `;
        }
    }}
`;

const Tab = ({ className, children, active, type = 'default' }: Tab) => {
    const [activeTab, setActiveTab] = React.useState<string>();

    React.useEffect(() => {
        setActiveTab(active);
    }, [active]);

    return (
        <div className={className}>
            <TabNavigation type={type}>
                {React.Children.map(children, child => {
                    return (
                        <TabNavigationItem
                            type={type}
                            active={child.props.id === activeTab}
                            onClick={() => setActiveTab(child.props.id)}
                        >
                            {child.props.label}
                        </TabNavigationItem>
                    );
                })}
            </TabNavigation>
            {React.Children.map(children, child => {
                if (child.props.id === activeTab) {
                    return React.cloneElement<TabContent>(child);
                }
                return null;
            })}
        </div>
    );
};

export default styled(Tab)`
    width: 100%;
`;

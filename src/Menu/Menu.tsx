import styled from 'styled-components';

interface MenuItem {
    isActive?: boolean;
}

export const MenuItem = styled.a<MenuItem>`
    padding: 15px 25px;
    color: ${({theme: { menu: { item } }}) => item.default.color };
    display: flex;
    cursor: pointer;
    font-size: 14px;

    ${({theme: { menu : { item }}, isActive}) => {
        if (isActive) {
            return `
                background: ${item.active.backgroundColor};
                color: ${item.active.color};
            `;
        }
        return;

    }};

    &:hover {
        ${({theme: { menu: {item: { hover}} }}) => {
            return `
                background: ${hover.backgroundColor};
                color: ${hover.color};
            `;
        } }
    }
`;

interface Menu {
    dropShadow?: boolean;
}

export const Menu = styled.div<Menu>`
    ${({theme: { menu}, dropShadow}) => {
        const shadowCSS = dropShadow ? `box-shadow: ${menu.boxShadow};` : null;
        return `
            background: ${menu.backgroundColor};
            ${shadowCSS}
        `;
    }}

    width: 100%;
    display:flex;
    flex-direction: column;
    min-width: 200px;
`;

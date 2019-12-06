import * as React from 'react';
import styled from 'styled-components';

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/

export type HorizontalAlignment =
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
export type VerticalAlignment =
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'stretch'
    | 'baseline';
interface Alignment {
    horizontalAlignment?: HorizontalAlignment;
    verticalAlignment?: VerticalAlignment;
}

interface Grid extends Alignment {
    className?: string;
    children: JSX.Element | JSX.Element[];
    width?: string;
    height?: string;
    spacing?: number;
    type?: 'row' | 'column';
}

const Grid = ({ className, children, spacing }: Grid) => {
    if (spacing) {
        const items = React.Children.map(children, child => {
            return React.cloneElement<Item>(child, {
                spacing: child.props.spacing || spacing,
            });
        });
        return <div className={className}>{items}</div>;
    }

    return <div className={className}>{children}</div>;
};

const getWidth = (value?: string | number, spacing?: number) => {
    if (typeof value === 'string') {
        if (spacing) {
            return `calc(${value} - ${spacing}px)`;
        }
        return value;
    } else if (typeof value === 'number') {
        return `${value}px`;
    }

    if (spacing) {
        return `calc(100% - ${spacing}px)`;
    }
    return '100%';
};

const horizontalAlignment = ({
    horizontalAlignment = 'flex-start',
}: Alignment) => `
    justify-content: ${horizontalAlignment};
`;

const verticalAlignment = ({ verticalAlignment = 'flex-start' }: Alignment) => `
    align-items: ${verticalAlignment};
`;

export const StyledGrid = styled(Grid)<Grid>`
    display: flex;
    flex-flow: ${({ type = 'column' }) =>
        type === 'column' ? 'row' : 'column'};

    width: ${({ width }) => getWidth(width)};
    height: ${({ height }) => height};
    box-sizing: border-box;

    ${horizontalAlignment};
    ${verticalAlignment};
`;

interface Item extends Grid {
    spacing?: number;
    grow?: boolean;
}

export const StyledItem = styled.div<Item>`
    display: flex;
    flex-flow: row wrap;


    ${({ grow, width, spacing }) => {
        if (grow) {
            return `
                flex-grow: 1;
            `;
        }
        return `
            width: ${getWidth(width, spacing)};
        `;
    }}

    height: ${({ height }) => height};
    box-sizing: border-box;

    ${horizontalAlignment};
    ${verticalAlignment};
    ${({ spacing }: Item) => {
        if (spacing) {
            return `margin: ${spacing * 0.5}px`;
        }
        return ``;
    }};
`;

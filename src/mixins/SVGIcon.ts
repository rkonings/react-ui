import IconProps, { IconSize } from '../interfaces/IconProps';
import Theme from '../interfaces/Theme';
import DefaultTheme from '../themes/default';

export const IconSpacing = ({ spacing }: IconProps) => {
    if (spacing === 'top') {
        return `margin-top: 1em`;
    } else if (spacing === 'right') {
        return `margin-right: 1em`;
    } else if (spacing === 'bottom') {
        return `margin-bottom: 1em`;
    } else if (spacing === 'left') {
        return `margin-left: 1em`;
    }
    return;
};

const getIconSize = (theme: Theme, size?: IconSize) => {
    if (size) {
        return theme.icon.size[size];
    }
    return theme.icon.size.m;
};

export const SVGIcon = ({
    theme = DefaultTheme,
    type = 'default',
    size,
}: IconProps) => `
  fill: ${theme.icon[type] || theme.icon.default};
  width: ${getIconSize(theme, size)}px;
  height: ${getIconSize(theme, size)}px;
`;

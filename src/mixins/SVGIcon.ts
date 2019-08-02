import IconProps from '../interfaces/IconProps';
import DefaultTheme from '../themes/default';

export const IconSpacing = ({spacing}: IconProps) => {
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

export const SVGIcon = ({theme = DefaultTheme, type = 'default', size}: IconProps) => `
  fill: ${theme.icon[type] || theme.icon.default};
  width: ${size || theme.icon.defaultSize}px;
  height: ${size || theme.icon.defaultSize}px;
`;

import Theme from '../interfaces/Theme';

export const SVGIcon = ({theme, type = 'default'}: {theme: Theme, type: string}) => `
  fill: ${theme.icon[type] || theme.icon.default};
`;

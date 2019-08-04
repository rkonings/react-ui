import Theme from './Theme';
type IconType = 'default' | 'primary' | 'seconadairy';
type IconSpacing = 'top' | 'right' | 'bottom' | 'left';
export type IconSize = 'xs' | 'sm' | 'm' | 'l' | 'xl';

export default interface IconProps {
    type?: IconType;
    size?: IconSize;
    width?: number;
    height?: number;
    className?: string;
    theme?: Theme;
    spacing?: IconSpacing;

}

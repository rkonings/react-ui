import Theme from './Theme';
type IconType = 'default' | 'primary' | 'seconadairy';
type IconSpacing = 'top' | 'right' | 'bottom' | 'left';

export default interface IconProps {
    type?: IconType;
    size?: number;
    width?: number;
    height?: number;
    className?: string;
    theme?: Theme;
    spacing?: IconSpacing;

}

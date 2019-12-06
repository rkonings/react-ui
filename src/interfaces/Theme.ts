export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';
export type Type = 'default' | 'primary' | 'secondairy';

export default interface Theme {
    // tslint:disable-next-line:no-any
    [s: string]: any;
}

interface Sizes {
    mobileS: number;
    mobileM: number;
    mobileL: number;
    tablet: number;
    laptop: number;
    laptopL: number;
    desktop: number;
}

interface Device {
    mobileS: string;
    mobileM: string;
    mobileL: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    desktop: string;
}

const size: Sizes = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560,
};
export const device = Object.keys(size).reduce<Device>((acc, cur) => {
    acc[cur] = `(max-width: ${size[cur]}px)`;
    return acc;
}, {} as Device);

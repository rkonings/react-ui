import styled from 'styled-components';

export const HeaderTitle = styled.div`
    ${({theme}) => {
        return `
            font-weight: 400;
            font-size: 60px;
            position: relative;
        `;
    }};
`;

export const HeaderSubTitle = styled.div`
    ${({theme}) => {
        return `
            font-weight: 200;
            font-size: 30px;
            position: relative;
        `;
    }};

`;

interface Header {
    backgroundImage?: string;
}

const Header = styled.div<Header>`
    ${({theme, backgroundImage}) => {
        return `
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            color: ${backgroundImage ? theme.color.white : theme.color.black};
            background: ${theme.color.gray20};
            width: 100%;
            height: 250px;
            padding-bottom: 40px;
            padding-left: 40px;
            position: relative;
        `;
    }};

    ${({backgroundImage}) => {
        if (backgroundImage) {
            return `
                background-image: url('${backgroundImage}');
                background-size: cover;
                background-position: center center;

                &::before {
                    content: ' ';
                    background-image: linear-gradient(0deg,rgba(0,0,0,.8),rgba(0,0,0,0));
                    position: absolute;
                    left:0;
                    top:0;
                    width: 100%;
                    height: 100%;
                }
            `;
        }

        return;
    }};

`;

export default Header;

import React from 'react';
import styled from 'styled-components';

interface Popover {
    className?: string;
    children: (close: React.Dispatch<React.SetStateAction<boolean>>) => string | JSX.Element | JSX.Element[];
    link: JSX.Element;
}

const StyledClickAway = styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
`;

const Content = styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 20px;
    width: 300px;
    box-sizing: border-box;
    padding: 1em;
    background: ${({theme: { color }}) => color.gray10};
    border: 1px solid ${({theme: { color }}) => color.gray40};


    ::after {
        content: '';
        position: absolute;
        pointer-events: none;
        clip-path: polygon(100% 100%, 0px 100%, 100% 0px);
        border-top-left-radius: 100%;
        width: 20px;
        height: 20px;
        background-color: inherit;
        transform: rotate(-135deg);
        top: -10px;
        left: calc(50% - 10px);
        border-width: 1px;
        border-style: solid;
        border-color: ${({theme: { color }}) => color.gray40};
        border-image: initial;
    }
`;

const Popover = ({className, children, link}: Popover) => {
    const [ open, setOpen ] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);

    return (
        <div ref={ref} className={className}>
            {React.cloneElement(link, { onClick: () => setOpen(!open) })}
            {open && (
                <React.Fragment>
                    <StyledClickAway onClick={() => setOpen(false)} />
                    <Content>
                        {children(setOpen)}
                    </Content>
                </React.Fragment>
            )}
        </div>
    );
};

export default styled(Popover)`
    position: relative;
`;

import React from 'react';
import styled from 'styled-components';

interface Steps {
    children: JSX.Element | JSX.Element[];
    index?: number;
    className?: string;
    next?: (currentIndex: number) => void;
    prev?: (currentIndex: number) => void;
    submit?: () => void;
}

const Header = styled.div``;

import Button from '../../Button/Button';
import { InputField } from '../../Form';

interface Footer {
    next?: () => void;
    prev?: () => void;
    submit?: () => void;
    className?: string;
}

export const Footer = styled(({ className, next, prev, submit }: Footer) => (
    <div className={className}>
        <InputField>
            {prev && <Button onClick={() => prev()}>back</Button>}
            {next && <Button onClick={() => next()}>next</Button>}
            {submit && <Button onClick={() => submit()}>Submit</Button>}
        </InputField>
    </div>
))``;

export const Steps = styled(
    ({ className, children, index = 0, next, prev, submit }: Steps) => {
        const cp = React.Children.toArray(children)[index];
        const count = React.Children.count(children);

        const footerNext =
            next && index < count - 1 ? () => next(index) : undefined;
        const footerPrev = prev && index > 0 ? () => prev(index) : undefined;
        const footerSubmit = submit && index === count - 1 ? submit : undefined;

        return (
            <div className={className}>
                <Header>
                    {index + 1} / {count}
                </Header>
                {cp}
                <Footer
                    submit={footerSubmit}
                    next={footerNext}
                    prev={footerPrev}
                />
            </div>
        );
    }
)``;

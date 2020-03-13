// import React from 'react';
// import styled from 'styled-components';

import { ValidationErrors } from '../../Validation';
import { Values } from './conversion';

export interface Step {
    id: string;
    onChange: (field: string, value: string) => void;
    errors: ValidationErrors;
    values: Values;
    className?: string;
    next?: () => void;
    prev?: () => void;
}

// import Button from '../../Button/Button';
// import { InputField } from '../../Form';

// interface Footer {
//     next?: () => void;
//     prev?: () => void;
//     className?: string;
// }

// export const Footer = styled(({ className, next, prev }: Footer) => (
//     <div className={className}>
//         <InputField>
//             {prev && <Button onClick={() => prev()}>back</Button>}
//             {next && <Button onClick={() => next()}>next</Button>}
//         </InputField>
//     </div>
// ))``;

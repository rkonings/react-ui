import styled from 'styled-components';
import TextField from '../Input/TextField/TextField';

export interface ChangedItem {
    field: string;
    value: string | boolean | number;
}

export interface ChangeOptions {
    saveFields?: boolean;
}
export type ChangedItems = ChangedItem[];
export type OnChangeHandler = (
    items: ChangedItems,
    options?: ChangeOptions,
    callBack?: () => void
) => void;

export const InputField = styled.div`
    padding-bottom: 2em;

    ${TextField} {
        input {
            background: none;
        }
    }
`;

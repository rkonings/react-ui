import React from 'react';
import styled from 'styled-components';
import TextField from '../../Input/TextField/TextField';

interface Item {
    className?: string;
    name?: string;
    price?: number;
    quantity?: number;
    tax?: number;
}

const Name = styled.div`
    flex: 1;
    margin-right: 25px;
`;
const Price = styled.div`
    width: 80px;
    margin-right: 25px;
`;

const Total = styled.div`
    width: 80px;
`;
const Quantity = styled.div`
    width: 75px;
    margin-right: 25px;
`;
const Tax = styled.div`
    width: 50px;
    margin-right: 25px;
`;

const calculateTotal = (price?: number, quantity?: number) => {
    if (price && quantity) {
        return price * quantity * (100 + 21) / 10000;
    }

    return undefined;
};

const Item = ({className, name, price, quantity, tax}: Item) => {

    const total = calculateTotal();

    return (
        <div className={className}>
            <Name>
                <TextField
                    grow={true}
                    value={name}
                    placeHolder="Product name"
                />
            </Name>
            <Quantity>
                <TextField
                    grow={true}
                    value={quantity ? quantity.toString() : undefined}
                    textAlign="right"
                    postfix="x"
                />
            </Quantity>
            <Price>
                <TextField
                    grow={true}
                    value={price ? price.toString() : undefined}
                    textAlign="right"
                    placeHolder="00,00"
                    prefix="€"
                />
            </Price>
            <Tax>
                <TextField
                    grow={true}
                    value={tax ? tax.toString() : undefined}
                    textAlign="right"
                    postfix="%"
                />
            </Tax>
            <Total>
                <TextField
                    grow={true}
                    placeHolder="00,00"
                    value={total ? total.toString() : undefined}
                    textAlign="right"
                    prefix="€"
                    readOnly={true}
                /></Total>
        </div>
    );
};

export default styled(Item)`
    display: flex;
    flex-direction: row;
`;

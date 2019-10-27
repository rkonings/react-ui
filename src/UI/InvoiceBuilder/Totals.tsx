import React from 'react';
import styled from 'styled-components';
import { ItemData } from './interfaces';
import Taxes from './Taxes';
import Total from './Total';

interface Totals {
    className?: string;
    items: ItemData[];
}
const Line = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: ${({theme: { color }}) => color.black};
    font-size: 14px;
    height: 48px;
    display:flex;
    align-items: center;
`;
const Label = styled.div`
    width: 120px;
    text-align: right;
    padding-right: 25px;
    text-transform: uppercase;
    font-size: 12px;
    border-bottom: 1px solid rgba(0,0,0,0);
`;
const Amount = styled.div`
    width: 120px;
    border-bottom: 1px solid ${({theme: { color }}) => color.gray60};
    display:flex;
    box-sizing: border-box;
    height: 100%;
    display:flex;
    align-items: center;
`;

const CurrencySign = styled.div`
    width: 15px;
`;
const Value = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`;

const Totals = ({className, items}: Totals) => {
    return (

        <div className={className}>
            <Line>
                <Label>Sub total</Label>
                <Amount>
                    <CurrencySign>€</CurrencySign>
                    <Value>
                        <Total items={items} excludeTaxes={true} />
                    </Value>
                </Amount>
            </Line>
            <Line>
                <Label>Taxes</Label>
                <Amount>
                    <CurrencySign>€</CurrencySign>
                    <Value>
                        <Taxes items={items} />
                    </Value>
                </Amount>
            </Line>
            <Line>
                <Label>Total</Label>
                <Amount>
                    <CurrencySign>€</CurrencySign>
                    <Value>
                        <Total items={items} />
                    </Value>
                </Amount>
            </Line>
        </div>
    );
};

export default styled(Totals)`
    margin-top: 2em;
`;

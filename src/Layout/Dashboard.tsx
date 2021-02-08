import React from 'react';
import styled, { css } from 'styled-components';

interface Dashboard {
    className?: string;
}

const AreaHeader = styled.div`
    grid-area: area-header;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const center = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderArea = styled.div`
    background: #e7e7e7;
    &:nth-child(even) {
        background: #f7f7f7;
    }
    min-height: 200px;
    ${center}
`;

const Area1 = styled.div`
    grid-area: area-1;
    background: #eee;
    ${center}
`;

const Area2 = styled.div`
    grid-area: area-2;
    background: #f3f3f3;
    ${center}
    min-height: 200px;
`;

const Area3 = styled.div`
    grid-area: area-3;
    background: #cecece;
    ${center}
    min-height: 200px;
`;

const Dashboard = styled(({ className }: Dashboard) => {
    return (
        <div className={className}>
            <AreaHeader>
                <HeaderArea>KPI</HeaderArea>
                <HeaderArea>KPI</HeaderArea>
                <HeaderArea>KPI</HeaderArea>
            </AreaHeader>
            <Area1>Main</Area1>
            <Area2>Area 2</Area2>
            <Area3>Area 3</Area3>
        </div>
    );
})`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: min-content;
    grid-template-areas:
        'area-header area-header area-header'
        'area-1 area-1 area-2'
        'area-1 area-1 area-3';
`;

export default Dashboard;

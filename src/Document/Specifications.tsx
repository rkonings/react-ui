import React from 'react';
import styled from 'styled-components';

import { Table } from './Elements';

interface WorkDaySpecification {
    date: string;
    project: string;
    mechanic: string;
    time: string;
    pause: string;
    hours: string;
    hourRate: string;
}

interface Specifications {
    className?: string;
    workDays: WorkDaySpecification[];
}

export default styled(({ className, workDays }: Specifications) => {
    return (
        <div className={className}>
            <Table>
                <thead>
                    <tr>
                        <th className="date">datum</th>
                        <th className="project">project</th>
                        <th className="mechanic">monteur</th>
                        <th className="time">werktijden</th>
                        <th className="pause">pauze</th>
                        <th className="hours">uren (facturabel)</th>
                        <th className="hourRate">uurtarief</th>
                    </tr>
                </thead>
                <tbody>
                    {workDays.map(
                        (
                            {
                                project,
                                date,
                                mechanic,
                                time,
                                pause,
                                hourRate,
                                hours,
                            },
                            index
                        ) => (
                            <tr key={index}>
                                <td className="date">{date}</td>
                                <td className="project">{project}</td>
                                <td className="mechanic">{mechanic}</td>
                                <td className="time">{time}</td>
                                <td className="pause">{pause}</td>
                                <td className="hours">{hours}</td>
                                <td className="hourRate">{hourRate}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
})`
    table {
        border-spacing: 0;
    }

    th {
        font-weight: 600;
        text-align: left;
        padding-bottom: 10px;
        vertical-align: text-bottom;
    }

    .date {
        width: 100px;
    }

    .time {
        width: 100px;
    }

    .project {
        width: 200px;
    }

    .pause {
        padding: 0 10px;
    }

    td.pause,
    td.hours {
        text-align: center;
    }

    .hourRate {
        width: 100px;
        text-align: right;
    }

    .mechanic {
        width: 100px;
    }

    .price {
        width: 100px;
    }
`;

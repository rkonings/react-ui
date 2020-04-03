import React from 'react';
import styled from 'styled-components';
import Number from './../Formatter/Number';

import { Table } from './Elements';

interface WorkDaySpecification {
    date: string;
    project: string;
    mechanic: string;
    time: string;
    pause?: string;
    hours: string;
    hourRate: string;
}

interface Specifications {
    className?: string;
    workDays: WorkDaySpecification[];
}

interface Mechanic {
    hours: number;
    rate: number;
    name: string;
}

interface Mechanics {
    [mechanic: string]: Mechanic;
}

export const getWorkdaysInvoiceLines = (workDays: WorkDaySpecification[]) => {
    const mechanics: Mechanics = workDays.reduce<Mechanics>(
        (mechanics, workDay) => {
            if (!mechanics[workDay.mechanic]) {
                mechanics[workDay.mechanic] = {
                    hours: 0,
                    rate: Number.unformat(workDay.hourRate) * 100,
                    name: workDay.mechanic,
                };
            }
            mechanics[workDay.mechanic].hours =
                mechanics[workDay.mechanic].hours +
                Number.unformat(workDay.hours);

            return mechanics;
        },
        {}
    );

    return Object.keys(mechanics).map(mechanic => {
        const { hours, rate, name } = mechanics[mechanic];
        return {
            amount: hours,
            price: rate,
            description: (
                <div>
                    werkzaamheden {name} | {hours} uur
                </div>
            ),
        };
    });
};

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
                        {workDays.length > 0 && workDays[0].pause && (
                            <th className="pause">pauze</th>
                        )}
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
                                {workDays.length > 0 && workDays[0].pause && (
                                    <td className="pause">{pause}</td>
                                )}
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

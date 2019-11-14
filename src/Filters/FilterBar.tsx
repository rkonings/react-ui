import React from 'react';
import styled from 'styled-components';
import Filter from './Filter';

interface Filter {
    id: string;
    label: string;
    options: string[];
    value: string[];
}

interface FilterBar {
    className?: string;
    data: Filter[];
    onChange(data: Filter[]): void;
}

const FilterBar = ({className, data, onChange}: FilterBar) => {
    const [open, setOpen] = React.useState<string | null>(null);
    const [filters, setFilters] = React.useState<Filter[]>(data);

    const setFilterValue = (id: string, value: string[]) => {
        const newFilters = [...filters];
        const filter = newFilters.find((filter) => filter.id === id );
        if (filter) {
            filter.value = value;
            setFilters(newFilters);
            onChange(newFilters);
        }
    };

    const clickHandler = (id: string) => {

        if (open === id) {
            setOpen(null);
        } else {
            setOpen(id);
        }

    };

    const keyDownHandler = (e: React.KeyboardEvent, id: string) => {
        if (e.keyCode === 32) { // Space
            if (open === id) {
                setOpen(null);
            } else {
                setOpen(id);
            }
        }
    };

    return (
        <div className={className}>
            {filters.map((filter) => {
                return (
                    <Filter
                        onKeyDown={(e) => keyDownHandler(e, filter.id)}
                        label={filter.label}
                        key={filter.id}
                        onClick={() => clickHandler(filter.id)}
                        value={filter.value}
                        options={filter.options}
                        open={open === filter.id ? true : false}
                        onChange={(value) => setFilterValue(filter.id, value)}
                    />
                );
            })}
        </div>
    );

};

export default styled(FilterBar)`
    display: flex;

`;
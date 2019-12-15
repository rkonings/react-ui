import React from 'react';
import styled from 'styled-components';
import FilterDropDown, { FilterConfig } from './Filter';

interface FilterBar {
    className?: string;
    data: FilterConfig[];
    onChange(values: { [key: string]: string[] }): void;
}

const FilterBar = ({ className, data, onChange }: FilterBar) => {
    const [open, setOpen] = React.useState<string | null>(null);
    const [filters, setFilters] = React.useState<FilterConfig[]>(data);

    const setFilterValue = (id: string, value: string[]) => {
        const newFilters = [...filters];
        const filter = newFilters.find(filter => filter.id === id);
        if (filter) {
            filter.value = value;
            setFilters(newFilters);
            const newValues = newFilters.reduce((obj, item) => {
                if (item.value && item.value.length > 0) {
                    obj[item.id] = item.value;
                }
                return obj;
            }, {});
            onChange(newValues);
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
        if (e.keyCode === 32 || e.key === 'Enter') {
            // Space
            if (open === id) {
                setOpen(null);
            } else {
                setOpen(id);
            }
        }
    };

    return (
        <div className={className}>
            {filters.map(filter => {
                return (
                    <FilterDropDown
                        onKeyDown={e => keyDownHandler(e, filter.id)}
                        label={filter.label}
                        search={filter.search}
                        key={filter.id}
                        onClick={() => clickHandler(filter.id)}
                        value={filter.value ? filter.value : []}
                        options={filter.options}
                        open={open === filter.id ? true : false}
                        onChange={value => setFilterValue(filter.id, value)}
                    />
                );
            })}
        </div>
    );
};

export default styled(FilterBar)`
    display: flex;
`;

import React from 'react';
import styled from 'styled-components';
import { Button, TextButton } from '../Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Popup, { PopupContent, PopupFooter, PopupHeader } from '../Popup/Popup';
import { FilterConfig, FilterList } from './Filter';

interface FilterPopup {
    className?: string;
    width?: string;
    data: FilterConfig[];
    onChange(values: { [key: string]: string[] }): void;
}

const FilterPopup = ({ className, width, data, onChange }: FilterPopup) => {
    const [filters, setFilters] = React.useState<FilterConfig[]>(data);
    const setFilterValue = (id: string, value: string[]) => {
        const newFilters = [...filters];
        const filter = newFilters.find(filter => filter.id === id);
        if (filter) {
            filter.value = value;
            setFilters(newFilters);
        }
    };
    const onChangeHandler = () => {
        const newValues = filters.reduce((obj, item) => {
            if (item.value && item.value.length > 0) {
                obj[item.id] = item.value;
            }
            return obj;
        }, {});
        onChange(newValues);
    };

    return (
        <div className={className}>
            <Popup
                width={width}
                clickAway={true}
                link={<Button>Filter</Button>}
            >
                {setOpen => (
                    <React.Fragment>
                        <PopupHeader>What do u want to filter?</PopupHeader>
                        <PopupContent>
                            {filters.map(filter => {
                                return (
                                    <FilterList
                                        label={filter.label}
                                        search={filter.search}
                                        key={filter.id}
                                        value={filter.value ? filter.value : []}
                                        options={filter.options}
                                        onChange={value =>
                                            setFilterValue(filter.id, value)
                                        }
                                    />
                                );
                            })}
                        </PopupContent>
                        <PopupFooter>
                            <ButtonGroup>
                                <TextButton onClick={() => setOpen(false)}>
                                    cancel
                                </TextButton>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        onChangeHandler();
                                        setOpen(false);
                                    }}
                                >
                                    Filter
                                </Button>
                            </ButtonGroup>
                        </PopupFooter>
                    </React.Fragment>
                )}
            </Popup>
        </div>
    );
};

export default styled(FilterPopup)`
    ${PopupContent} {
        flex-direction: row;
        display: flex;
        height: 400px;
    }

    ${FilterList} {
        margin-right: 3em;
        max-width: 250px;
    }
`;

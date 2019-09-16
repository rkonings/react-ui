import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import TextButton from '../../Button/TextButton';
import Calendar from '../../Calendar/Calendar';
import { DateRange } from '../../interfaces/Date';
import { Menu, MenuItem } from '../../Menu/Menu';

type CurrentTypes = 'day' | 'month' | 'year' | 'isoWeek';
type PreviousTypes = 'day' | 'month' | 'week';

interface ActionCurrent {
    action: 'CURRENT';
    type: CurrentTypes;
}

interface ActionPrevious {
    action: 'PREVIOUS';
    type: PreviousTypes;
    value: number;
}

interface ActionLast {
    action: 'LAST';
    type: 'day' | 'month' | 'year' | 'isoWeek';
}

interface PresetItem {
    name: string;
    action: 'CURRENT' | 'PREVIOUS' | 'LAST' | 'CUSTOM';
    type?:  CurrentTypes | PreviousTypes;
    value?: number;
}

interface DateRangePresetsMenu {
    className?: string;
    items: PresetItem[];
    activePreset?: PresetItem;
    onChange(item: PresetItem): void;
}

type Preset =  ActionPrevious | ActionCurrent | ActionLast;

const isPrevious = (item: Preset ): item is ActionPrevious => {
    if (item.action === 'PREVIOUS') {
        return true;
    }
    return false;
};

const isCurrent = (item: Preset): item is ActionCurrent => {
    if (item.action === 'CURRENT') {
        return true;
    }
    return false;
};

const isLast = (item: Preset): item is ActionLast => {
    if (item.action === 'LAST') {
        return true;
    }
    return false;
};

export const DateRangePresetsMenu = styled(({className,
    items, activePreset = null, onChange}: DateRangePresetsMenu) => {
    const [activeItem, setActiveItem] = React.useState<PresetItem | null>(null);

    React.useEffect(() => {
        setActiveItem(activePreset);
    }, [activePreset]);

    return (
        <Menu className={className}>
            {items.map((item) => {
                const onClickHandler = (item: PresetItem) => {
                    setActiveItem(item);
                    onChange(item);
                };

                return (
                    <MenuItem
                        isActive={!!(activeItem === item)}
                        key={item.name}
                        onClick={() => onClickHandler(item)}
                    >
                        {item.name}
                    </MenuItem>
                );
            })}
        </Menu>
    );
} )`
    width: 200px;
`;

interface DateDisplay {
    className?: string;
    title: string;
    date: DateRange | null;
    onClick(): void;
}

const PresetTypeName = styled.div`
    color: ${({theme: { color }}) => color.gray80};
    padding-right: 10px;
`;

const DateDisplay = styled(({className, date, title, onClick}: DateDisplay) => {
    let formattedDate;
    if (date) {
        if (date.start && date.end && date.start.isSame(date.end, 'day')) {
            formattedDate = date.start.format('D MMM YYYY');
        } else {
            const start = (date.start) ? date.start.format('D MMM YYYY') : '...';
            const end = (date.end) ? date.end.format('D MMM YYYY') : '...';
            formattedDate = start + ' - ' + end;
        }
    }

    return (
        <div onClick={onClick} className={className}>
            <PresetTypeName>{title}</PresetTypeName> {formattedDate}
        </div>
    );
})`
    font-size: 13px;
    display: flex;
`;

const DATE_PRESET_ITEMS: PresetItem[] = [
    { name: 'Today', action: 'CURRENT', type: 'day' },
    { name: 'This week (Sun - Today)', action: 'CURRENT', type: 'isoWeek' },
    { name: 'Last 7 days', action: 'PREVIOUS', type: 'day', value: 7  },
    { name: 'Last week', action: 'LAST', type: 'isoWeek'  },
    { name: 'Last 14 days', action: 'PREVIOUS', type: 'day', value: 14  },
    { name: 'This month', action: 'CURRENT', type: 'month' },
    { name: 'Last 30 days', action: 'PREVIOUS', type: 'day', value: 30 },
    { name: 'Last month', action: 'LAST', type: 'month' },
];

interface DateRangePicker {
    className?: string;
    onChange(date: DateRange | null): void;
}

const getDateRange = (item: Preset): DateRange | null => {
    if (isCurrent(item)) {
        return {
            start: moment().startOf(item.type),
            end: moment().endOf(item.type)
        };
    } else if (isPrevious(item)) {
        return {
            start: moment().subtract(item.value, item.type).startOf(item.type),
            end: moment().subtract(1, item.type).endOf(item.type)
        };
    } else if (isLast(item)) {
        return {
            start: moment().subtract(1, item.type).startOf(item.type),
            end: moment().subtract(1, item.type).endOf(item.type)
        };
    } else {
        return null;
    }
};

interface DatePickerMenu {
    isOpen?: boolean;
}

const DatePickerMenu = styled.div<DatePickerMenu>`
     ${({theme: { menu}}) => {
        return `
            background: ${menu.backgroundColor};
            box-shadow: ${menu.boxShadow};
        `;
    }}

    ${({isOpen = false}) => {
        return `
            display: ${isOpen ? 'flex' : 'none'};
        `;
    }};


    position: absolute;
    flex-wrap: wrap;
    width: 520px;
    top:0;
    justify-content: space-between;

`;

const MenuFooter = styled.div`
    width: 100%;
    display:flex;
    justify-content: flex-end;
`;

const StyledClickAway = styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
`;

export default styled(({className, onChange}: DateRangePicker) => {
    const dateRange = {
        start: moment().startOf('day'),
        end: moment().endOf('day')
    };
    const [value, setValue] = React.useState<DateRange | null>(dateRange);
    const [customDate, setCustomDate] = React.useState<DateRange | null>(null);
    const [activePreset, setActivePreset] = React.useState<PresetItem>(DATE_PRESET_ITEMS[0]);
    const [selectedPreset, setSelectedPreset] = React.useState<PresetItem>(DATE_PRESET_ITEMS[0]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const onChangePreset = (item: PresetItem) => {
        const date = getDateRange(item as Preset);
        if (date) {
            setValue(date);
            setActivePreset(item);
            setSelectedPreset(item);
            setIsOpen(false);
            onChange(date);
        }
    };

    const onChangeCustom = (date: DateRange) => {
        setCustomDate(date);
    };

    const onApplyCustomPreset = () => {
        setValue(customDate);
        setActivePreset({action: 'CUSTOM', name: 'Custom'});
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className={className}>
            <DateDisplay
                onClick={() => setIsOpen(!isOpen)}
                date={value}
                title={activePreset.name}
            />
                <React.Fragment>
                    {isOpen && (
                        <StyledClickAway
                            onClick={() => {
                                setIsOpen(false);
                                setSelectedPreset(activePreset);
                            }}
                        />
                    )}
                    <DatePickerMenu isOpen={isOpen}>
                        <DateRangePresetsMenu
                            items={DATE_PRESET_ITEMS}
                            onChange={(item) => onChangePreset(item)}
                            activePreset={selectedPreset}
                        />
                        <Calendar
                            onFocus={() => setSelectedPreset({action: 'CUSTOM', name: 'Custom'})}
                            width={280}
                            onChange={(date) => onChangeCustom(date)}
                            startYear={2018}
                            endYear={2019}
                            value={value}
                        />
                        {selectedPreset.action === 'CUSTOM' && (
                            <MenuFooter>
                                <TextButton onClick={() => onApplyCustomPreset()}>Apply</TextButton>
                            </MenuFooter>
                        )}

                    </DatePickerMenu>
                </React.Fragment>

        </div>
    );
})`
    position: relative;
    width: 400px;

`;

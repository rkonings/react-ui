import { action } from '@storybook/addon-actions';
import { array, boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import React from 'react';

import { Grid, Item } from '../src/Grid';
import { ArrowLeft } from '../src/Icon';
import CheckBox from '../src/Input/Checkbox/Checkbox';
import DatePicker from '../src/Input/DatePicker';
import DateRangePicker from '../src/Input/DateRangePicker/DaterangePicker';
import Select from '../src/Input/Select/Select';
import Switch from '../src/Input/Switch/Switch';
import TextArea from '../src/Input/TextArea';
import CurrencyTextField from '../src/Input/TextField/CurrencyTextField';
import TextField from '../src/Input/TextField/TextField';
import { Size, Type } from '../src/interfaces/Theme';

const typeLabel = 'Type';
const typeOptions = ['default', 'primary', 'secondairy'];
const typeDefaultValue = 'default';

const sizeLabel = 'Size';
const sizeOptions = {
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
    xl: 'xl',
};
const sizeDefaultValue = 'm';

const inputTypeLabel = 'Input Type';
const inputTypeOptions = ['text', 'password', 'email'];
const inputTypeDefault = 'text';

storiesOf('Input/DatePicker', module).add('default', () => {
    return <DatePicker onChange={action('onChange')} />;
});

storiesOf('Input/DateRangePicker', module).add('advanced', () => {
    return <DateRangePicker onChange={action('onChange')} />;
});

storiesOf('Input/Select', module)
    .add('default', () => {
        const options = [
            { label: 'Dijkstra - Jacobs', value: '001' },
            { label: 'Ven V.O.F.', value: '002' },
            { label: 'Janssen, Groot and Dijk', value: '003' },
            { label: 'Willems Group', value: '004' },
            { label: 'Brink, Brink and Dijkstra', value: '005' },
        ];
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        return (
            <Grid width="600px" horizontalAlignment="flex-start">
                <Item
                    width="100%"
                    horizontalAlignment="flex-start"
                    verticalAlignment="center"
                >
                    <Select
                        size={size as Size}
                        onChange={action('onChange')}
                        options={options}
                        name={'companies'}
                    />
                </Item>
            </Grid>
        );
    })
    .add('with label', () => {
        const label = text('label', 'label');

        const options = [
            'Dijkstra - Jacobs',
            'Ven V.O.F.',
            'Janssen, Groot and Dijk',
            'Boer, Stichting and Jacobs',
            'Willems Group',
            'Brink, Brink and Dijkstra',
            'Smits, Boer and Brouwer',
        ];
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        return (
            <Grid width="600px" horizontalAlignment="flex-start">
                <Item
                    width="100%"
                    horizontalAlignment="flex-start"
                    verticalAlignment="center"
                >
                    <Select
                        size={size as Size}
                        label={label}
                        onChange={action('onChange')}
                        options={array('Options', options, ':')}
                        name={'companies'}
                    />
                </Item>
            </Grid>
        );
    })
    .add('with helper text', () => {
        const options = [
            'Dijkstra - Jacobs',
            'Ven V.O.F.',
            'Janssen, Groot and Dijk',
            'Boer, Stichting and Jacobs',
            'Willems Group',
            'Brink, Brink and Dijkstra',
            'Smits, Boer and Brouwer',
        ];
        return (
            <Grid width="600px" horizontalAlignment="flex-start">
                <Item
                    width="100%"
                    horizontalAlignment="flex-start"
                    verticalAlignment="center"
                >
                    <Select
                        onChange={action('onChange')}
                        options={array('Options', options, ':')}
                        name={'companies'}
                        helperText={'This is a helper'}
                    />
                </Item>
            </Grid>
        );
    })
    .add('with error', () => {
        const options = [
            'Dijkstra - Jacobs',
            'Ven V.O.F.',
            'Janssen, Groot and Dijk',
            'Boer, Stichting and Jacobs',
            'Willems Group',
            'Brink, Brink and Dijkstra',
            'Smits, Boer and Brouwer',
        ];
        return (
            <Grid width="600px" horizontalAlignment="flex-start">
                <Item
                    width="100%"
                    horizontalAlignment="flex-start"
                    verticalAlignment="center"
                >
                    <Select
                        onChange={action('onChange')}
                        options={array('Options', options, ':')}
                        name={'companies'}
                        errorText={'This is an error'}
                    />
                </Item>
            </Grid>
        );
    });
storiesOf('Input/Checkbox', module)
    .add('with label', () => {
        const type = select(typeLabel, typeOptions, typeDefaultValue);
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        const label = text('Label', 'label');
        return (
            <CheckBox
                type={type as Type}
                size={size as Size}
                label={label}
                onChange={action('onChange')}
                checked={boolean('Checked', false)}
            />
        );
    })
    .add('with error', () => {
        const type = select(typeLabel, typeOptions, typeDefaultValue);
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        const label = text('Label', 'label');
        return (
            <CheckBox
                type={type as Type}
                size={size as Size}
                label={label}
                onChange={action('onChange')}
                errorText={'Error'}
                // helperText={'This is a helper'}
                checked={boolean('Checked', false)}
            />
        );
    })
    .add('with helper', () => {
        const type = select(typeLabel, typeOptions, typeDefaultValue);
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        const label = text('Label', 'label');
        return (
            <CheckBox
                type={type as Type}
                size={size as Size}
                label={label}
                onChange={action('onChange')}
                helperText={'This is a helper'}
                checked={boolean('Checked', false)}
            />
        );
    });
storiesOf('Input/Switch', module)
    .add('swtich', () => {
        return (
            <Switch
                label={text('Label', 'remember me')}
                onChange={action('onChange')}
                checked={boolean('Checked', false)}
            />
        );
    })
    .add('with helper', () => {
        return (
            <Switch
                label={text('Label', 'remember me')}
                onChange={action('onChange')}
                checked={boolean('Checked', false)}
                helperText={'This is a helper'}
            />
        );
    });

storiesOf('Input/TextArea', module).add('default', () => {
    const label = text('Label', faker.lorem.words(4));
    const alignment = select('Alignment', ['left', 'right'], 'left');
    const placeholder = text('Placeholder', 'Alignment');
    const style = select('Style', ['default', 'outlined'], 'default');
    const helperText = text('Helper text', faker.lorem.words(15));
    return (
        <TextArea
            helperText={helperText}
            style={style}
            label={label}
            textAlign={alignment}
            placeHolder={placeholder}
        />
    );
});
storiesOf('Input/TextField', module)
    .add('with value', () => {
        const value = text('Value', 'react@development.nl');

        const inputType = select(
            inputTypeLabel,
            inputTypeOptions,
            inputTypeDefault
        );
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        const style = select('Style', ['default', 'outlined'], 'default');
        const hasError = boolean('Has error', false);

        return (
            <TextField
                value={value}
                hasError={hasError}
                inputType={inputType}
                size={size as Size}
                onChange={action('onChange')}
                style={style}
            />
        );
    })
    .add('with label', () => {
        const value = text('Value', 'react@development.nl');
        const label = text('Label', faker.lorem.words(4));
        const helperText = text('Helper text', faker.lorem.words(15));
        const inputType = select(
            inputTypeLabel,
            inputTypeOptions,
            inputTypeDefault
        );
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        const style = select('Style', ['default', 'outlined'], 'default');

        return (
            <TextField
                label={label}
                value={value}
                inputType={inputType}
                size={size as Size}
                onChange={action('onChange')}
                style={style}
                helperText={helperText}
            />
        );
    })
    .add('with currency mask', () => {
        return <CurrencyTextField />;
    })
    .add('with onFocus & onBlur', () => {
        const value = text('Value', 'react@development.nl');
        const inputType = select(
            inputTypeLabel,
            inputTypeOptions,
            inputTypeDefault
        );
        const style = select('Style', ['default', 'outlined'], 'default');
        return (
            <TextField
                value={value}
                inputType={inputType}
                onFocus={action('onFocus')}
                onBlur={action('onBlur')}
                onChange={action('onChange')}
                style={style}
            />
        );
    })
    .add('read only', () => {
        return (
            <TextField
                value={'Read only'}
                readOnly={true}
                onChange={action('onChange')}
            />
        );
    })
    .add('with alignment', () => {
        const alignment = select('Alignment', ['left', 'right'], 'left');
        const placeholder = text('Placeholder', 'Alignment');
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        return (
            <TextField
                size={size as Size}
                placeHolder={placeholder}
                textAlign={alignment}
                onChange={action('onChange')}
            />
        );
    })
    .add('with grow', () => {
        const prefix = text('Prefix', '€');
        const placeholder = text('Placeholder', '00,00');
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        return (
            <TextField
                size={size as Size}
                placeHolder={placeholder}
                prefix={prefix}
                grow={true}
                onChange={action('onChange')}
            />
        );
    })
    .add('with prefix', () => {
        const prefix = text('Prefix', '€');
        const placeholder = text('Placeholder', '00,00');
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        return (
            <TextField
                size={size as Size}
                placeHolder={placeholder}
                prefix={prefix}
                onChange={action('onChange')}
            />
        );
    })
    .add('with icon prefix', () => {
        const prefix = <ArrowLeft />;
        const placeholder = text('Placeholder', '00,00');
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        return (
            <TextField
                size={size as Size}
                placeHolder={placeholder}
                prefix={prefix}
                onChange={action('onChange')}
            />
        );
    })
    .add('with postfix', () => {
        const postfix = text('Prefix', '€');
        const placeholder = text('Placeholder', '00,00');
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        return (
            <TextField
                size={size as Size}
                placeHolder={placeholder}
                postfix={postfix}
                onChange={action('onChange')}
            />
        );
    })
    .add('with icon postfix', () => {
        const postfix = <ArrowLeft />;
        const placeholder = text('Placeholder', '00,00');
        const size = select(sizeLabel, sizeOptions, sizeDefaultValue);
        return (
            <TextField
                size={size as Size}
                placeHolder={placeholder}
                postfix={postfix}
                onChange={action('onChange')}
            />
        );
    })
    .add('with placeholder', () => {
        const placeholder = text('Placeholder', 'e-mail');
        return (
            <TextField
                placeHolder={placeholder}
                onChange={action('onChange')}
            />
        );
    })
    .add('with helper text', () => {
        const helperText = text('Helper text', 'some information');
        return (
            <TextField
                placeHolder={'name'}
                helperText={helperText}
                onChange={action('onChange')}
            />
        );
    })
    .add('with error', () => {
        return (
            <TextField
                placeHolder={'name'}
                errorText={'this is required'}
                onChange={action('onChange')}
            />
        );
    })
    .add('with autofocus', () => {
        return (
            <TextField
                autoFocus={true}
                placeHolder={'name'}
                onChange={action('onChange')}
            />
        );
    })
    .add('with custom width', () => {
        const width = text('Width', '200px');
        return (
            <TextField
                placeHolder={'name'}
                width={width}
                onChange={action('onChange')}
            />
        );
    })
    .add('with disabled', () => {
        const disabled = boolean('Disabled', true);
        return (
            <TextField
                placeHolder={'name'}
                disabled={disabled}
                onChange={action('onChange')}
            />
        );
    });

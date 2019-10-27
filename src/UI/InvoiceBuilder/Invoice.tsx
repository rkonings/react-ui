import React from 'react';
import styled from 'styled-components';
import Button from '../../Button/Button';
import { ItemData } from './interfaces';
import Item from './Item';

import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import Totals from './Totals';

interface Invoice {
    className?: string;
    items: ItemData[];
}

interface InvoiceValues {
    items: ItemData[];
}

const ItemSchema = Yup.object().shape({
    name: Yup.string()
        .required('is required'),
    price: Yup.number()
        .typeError('must be a number')
        .required('is required'),

    quantity: Yup.number()
        .typeError('must be a number')
        .required('is required'),
    tax: Yup.number()
        .typeError('must be a number')
        .required('is required')

});

const InvoiceSchema = Yup.object().shape({
    items: Yup.array().of(ItemSchema)
});

const Invoice = ({className, items: _items}: Invoice) => {

    const [items, setItems] = React.useState<ItemData[]>(_items);

    const addNewItem = () => {
        setItems([...items, {
            name: '',
            price: 0,
            quantity: 1,
            tax: 21
        }]);

    };

    return (
        <div className={className}>
            <Formik
                enableReinitialize={true}
                validationSchema={InvoiceSchema}
                initialValues={{items}}
                onSubmit={(values: InvoiceValues, { setSubmitting }: FormikActions<InvoiceValues>) => {
                    setTimeout(() => {
                        console.log(values);
                      setSubmitting(false);
                    }, 100);
                }}
            >
                {({ handleSubmit, handleChange, values, errors, touched, handleBlur, isSubmitting, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        {values.items.map((item, index) => {
                            return (
                                <Item
                                    inputNamePrefix={`items[${index}]`}
                                    errors={errors && errors.items && errors.items[index]}
                                    touched={touched && touched.items && touched.items[index]}
                                    setFieldValue={setFieldValue}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    key={index}
                                    {...item}
                                />
                            );
                        })}
                        <Button onClick={() => addNewItem()} type={'primary'}>Add</Button>
                        <Totals items={values.items} />
                        {/* <Button isLoading={isSubmitting} inputType={'submit'} type={'primary'}>Create</Button> */}
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default styled(Invoice)`
    width: 100%;
`;

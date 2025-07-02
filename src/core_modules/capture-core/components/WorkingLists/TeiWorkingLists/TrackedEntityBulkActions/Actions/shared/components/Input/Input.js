import React, { useEffect, useState } from 'react';
import { InputField } from '@dhis2/ui';

export const Input = (props) => {
    const [val, setVal] = useState(props?.values ?? '');
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (props?.values) {
            handleOnTextChange({ value: props?.values });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnTextChange = ({ value }) => {
        const isRequired = props?.params?.required ?? false;
        let isValueValid = true;

        if (isRequired) {
            isValueValid = props?.validate?.(value) ?? value !== '';
        }

        setTouched(true);
        setVal(value);
        setIsValid(isValueValid);
        props.onValueChange(val, isValueValid);
    };

    const error = touched && !isValid;

    return (
        <InputField
            {...(props?.params ?? {})}
            label={props.label}
            name={props.label}
            value={val}
            error={error}
            validationText={error ? props?.params?.validationText : ''}
            onChange={handleOnTextChange}
        />
    );
};

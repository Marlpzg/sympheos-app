import React, { useEffect, useState } from 'react';
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { getAttributeValue } from '../../utils/attributesUtils';

const isDefaultValueInOptions = (options, defaultValue) => {
    if (!options?.length || !defaultValue) return false;
    return options.some(option => option.value === defaultValue);
};

export const Select = (props) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [options, setOptions] = useState(() =>
        (props?.values?.length > 0 ? props?.values : []),
    );
    const { data } = useDataQuery(props?.query || {}, {
        enabled: !!props?.query,
    });
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (options?.length > 0) {
            setDisabled(false);
        }
    }, [options]);

    useEffect(() => {
        const hasOptions = data?.optionSets?.options?.length > 0;
        const hasAttributes = data?.attributes?.attributes?.length > 0;
        let newOptions = [];

        if (hasOptions) {
            newOptions = data.optionSets.options.map(option => ({
                label: option.name,
                value: option.code,
            }));
            setOptions(newOptions);
        }

        if (hasOptions && hasAttributes) {
            const defaultValue = getAttributeValue(
                data.attributes.attributes,
                props?.defaultValueField,
            );

            if (defaultValue && isDefaultValueInOptions(newOptions, defaultValue)) {
                handleOnSelectedChange({ selected: defaultValue });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleOnSelectedChange = ({ selected }) => {
        setSelectedValue(selected);
        props.onValueChange(selected);
    };

    return (
        <SingleSelectField
            empty={i18n.t('No data found')}
            label={props.label}
            loadingText={i18n.t('Loading options')}
            onChange={handleOnSelectedChange}
            selected={selectedValue}
            disabled={disabled || options?.length === 0}
            {...(props?.params ?? {})}
        >
            {options?.map(option => (
                <SingleSelectOption
                    key={option.value}
                    label={option.label}
                    value={option.value.toString()}
                />
            ))}
        </SingleSelectField>
    );
};

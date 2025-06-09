import React, { useState, useEffect } from 'react';
import { InputField, SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useDataQuery } from '@dhis2/app-runtime';
import { useDataStore } from '../../../hooks/useDataStore';

const optionSetsQuery = {
    results: {
        resource: 'optionSets',
        params: ({ idList }) => ({
            fields: 'id,name,code,options[id,name,code]',
            filter: `id:in:[${idList.join(',')}]`,
        }),
    },
};

const getOptions = (mappedOS, key) => mappedOS[key]?.map(option => (
    <SingleSelectOption
        key={option.id}
        value={option.id}
        label={option.name}
    />
));

export const Settings = () => {
    const { storeQuery } = useDataStore({ key: 'settings', lazyGet: false });
    const {
        loading: loadingOS,
        data: dataOS,
        refetch: refetchOS,
    } = useDataQuery(optionSetsQuery, { lazy: true });

    const [mappedOS, setMappedOS] = useState(undefined);
    const [formData, setFormData] = useState({
        authKey: '',
        instanceType: '',
        defaultProfile: '',
    });

    useEffect(() => {
        if (!dataOS) { return; }

        setMappedOS(dataOS.results.optionSets.reduce((acc, cur) => {
            acc[cur.id] = cur.options;
            return acc;
        }, {}));
    }, [dataOS, setMappedOS]);

    useEffect(() => {
        if (storeQuery.loading || dataOS || loadingOS) return;

        if (storeQuery?.data?.results) {
            refetchOS({ idList: Object.values(storeQuery.data.results.optionSets || {}) });
        }
    }, [storeQuery, refetchOS, dataOS, loadingOS]);

    return (<div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            padding: '2em',
        }}
    >
        <SingleSelectField
            inputWidth="50svw"
            label="Instance Type"
            selected={formData.instanceType}
            onChange={event => setFormData({ ...formData, instanceType: event.selected })}
        >
            {mappedOS && storeQuery.data &&
                getOptions(mappedOS, storeQuery.data.results.optionSets.instanceType)
            }
        </SingleSelectField>
        <InputField
            value={formData.authKey}
            onChange={event => setFormData({ ...formData, authKey: event.value })}
            placeholder="Auth Key"
            label="Auth Key"
            inputWidth="50svw"
        />
        {formData.instanceType === 'fv7AZKEjynM' &&
            <SingleSelectField
                inputWidth="50svw"
                label="Default Profile"
                selected={formData.defaultProfile}
                onChange={event => setFormData({ ...formData, defaultProfile: event.selected })}
            >
                {mappedOS && storeQuery.data &&
                    getOptions(mappedOS, storeQuery.data.results.optionSets.defaultProfile)
                }
            </SingleSelectField>
        }
    </div>);
};

export default Settings;

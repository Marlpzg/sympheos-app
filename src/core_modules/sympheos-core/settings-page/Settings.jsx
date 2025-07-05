// @flow
import React, { useState, useEffect } from 'react';
import { Button, IconSave24, InputField, SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { useSnackbar } from 'commons/Snackbar/SnackbarContext';
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

type IdentifiableObject = {
    id: string,
    name: string,
    code?: string,
};

type MappedOSType = {
    [key: string]: IdentifiableObject[],
};

const initialOSMap: ?MappedOSType = null;

const getOptions = (
    mappedOS: MappedOSType,
    key: string,
) => mappedOS[key]?.map((option: IdentifiableObject) => (
    <SingleSelectOption
        key={option.id}
        value={option.id}
        label={option.name}
    />
));

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1em',
    height: '100%',
    width: '100%',
    padding: '2em',
};

export const Settings = () => {
    const { storeMutation, storeQuery } = useDataStore({ key: 'settings', lazyGet: false });
    const {
        loading: loadingOS,
        data: dataOS,
        refetch: refetchOS,
    } = useDataQuery(optionSetsQuery, { lazy: true });
    const { showSnackbar } = useSnackbar();

    const [mappedOS, setMappedOS] = useState(initialOSMap);
    const [formData, setFormData] = useState({
        authKey: '',
        instanceType: '',
        defaultProfile: '',
    });
    const [saveDisabled, setSaveDisabled] = useState(true);

    const handleSubmit = () => {
        storeMutation.mutate({
            key: 'settings',
            data: { ...storeQuery.data.results, gatewayConnectivity: formData },
        }).then((value) => {
            if (value.httpStatus === 'OK') {
                showSnackbar({
                    key: 'settings-update-success',
                    message: 'Gateway Connectivity settings updated successfully.',
                    duration: 3000,
                    severity: 'success',
                });
                setSaveDisabled(true);
            } else {
                showSnackbar({
                    key: 'ds-update-error',
                    message: value.message || 'Error updating Data Store.',
                    severity: 'critical',
                });
            }
        });
    };

    useEffect(() => {
        if (!dataOS || !storeQuery.data) { return; }

        if (storeQuery.data.results.gatewayConnectivity) {
            setFormData(storeQuery.data.results.gatewayConnectivity);
        }

        setMappedOS(dataOS.results.optionSets.reduce((
            acc: MappedOSType,
            cur: {
                id: string,
                options: IdentifiableObject[]
            }
        ) => {
            acc[cur.id] = cur.options;
            return acc;
        }, {}));
    }, [dataOS, setMappedOS, storeQuery.data]);

    useEffect(() => {
        if (storeQuery.loading || dataOS || loadingOS) return;

        if (storeQuery?.data?.results) {
            refetchOS({ idList: Object.values(storeQuery.data.results.optionSets || {}) });
        }
    }, [storeQuery, refetchOS, dataOS, loadingOS]);

    useEffect(() => {
        if (formData.instanceType !== 'fv7AZKEjynM') {
            setFormData(prev => ({ ...prev, defaultProfile: '' }));
        }
    }, [formData.instanceType]);

    return (<div
        style={containerStyle}
    >
        <SingleSelectField
            inputWidth="50svw"
            label={i18n.t('Instance Type')}
            selected={formData.instanceType}
            loading={loadingOS || storeQuery.loading}
            onChange={(event) => {
                setFormData({ ...formData, instanceType: event.selected });
                setSaveDisabled(false);
            }}
        >
            {mappedOS && storeQuery.data &&
                getOptions(mappedOS, storeQuery.data.results.optionSets.instanceType)
            }
        </SingleSelectField>
        <InputField
            value={formData.authKey}
            onChange={(event) => {
                setFormData({ ...formData, authKey: event.value });
                setSaveDisabled(false);
            }}
            placeholder={i18n.t('Auth Key')}
            label="Auth Key"
            inputWidth="50svw"
        />
        {formData.instanceType === 'fv7AZKEjynM' &&
            <SingleSelectField
                inputWidth="50svw"
                label={i18n.t('Default Profile')}
                selected={formData.defaultProfile}
                onChange={(event) => {
                    setFormData({ ...formData, defaultProfile: event.selected });
                    setSaveDisabled(false);
                }}
            >
                {mappedOS && storeQuery.data &&
                    getOptions(mappedOS, storeQuery.data.results.optionSets.defaultProfile)
                }
            </SingleSelectField>
        }
        <Button
            primary
            onClick={handleSubmit}
            icon={<IconSave24 />}
            disabled={saveDisabled || loadingOS}
            loading={storeMutation.loading}
        >{i18n.t('Save changes')}</Button>
    </div>);
};

export default Settings;

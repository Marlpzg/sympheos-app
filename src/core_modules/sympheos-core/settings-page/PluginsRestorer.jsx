// @flow
import { Button } from '@dhis2/ui';
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime';
import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { FiEdit } from 'react-icons/fi';
import { useSnackbar, SnackbarSeverity } from 'commons/Snackbar/SnackbarContext';

import basePluginSettings from './pluginSettings';

const updateQuery = {
    resource: 'dataStore/capture/enrollmentOverviewLayout',
    type: 'update',
    data: ({ data }) => data,
};

const programsQuery = {
    results: {
        resource: 'programs',
        params: {
            fields: 'id',
            paging: false,
        },
    },
};

const baseUrlQuery = {
    results: {
        resource: 'system/info',
        params: {
            fields: 'instanceBaseUrl',
        },
    },
};

const setPluginsAppUrl = (pluginSettings: any, appUrl: string) => {
    pluginSettings.leftColumn.forEach((setting) => {
        if (setting.type === 'plugin') {
            setting.source = `${appUrl}${setting.source}`;
        }
    });
    pluginSettings.rightColumn.forEach((setting) => {
        if (setting.type === 'plugin') {
            setting.source = `${appUrl}${setting.source}`;
        }
    });
};

const PluginsRestorer = () => {
    const { showSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    const [
        mutateEnrollmentOverviewLayout,
        {
            loading: loadingUpdate,
            error: errorUpdate,
        },
    ] = useDataMutation(updateQuery, {
        // eslint-disable-next-line no-console
        onError: err => console.error(err),
        lazy: true,
    });

    const { data: baseUrlData, loading: baseUrlLoading } = useDataQuery(baseUrlQuery);

    const {
        loading: loadingPrograms,
        error: errorPrograms,
        refetch: refetchPrograms,
    } = useDataQuery(programsQuery, {
        // eslint-disable-next-line no-console
        onError: err => console.error(err),
        lazy: true,
    });

    const handleRestorePlugins = async () => {
        const baseUrl: string = baseUrlData?.results?.instanceBaseUrl;

        if (loadingUpdate || loadingPrograms || baseUrlLoading || !baseUrl) {
            return;
        }

        setIsLoading(true);

        const pluginSettings = JSON.parse(JSON.stringify(basePluginSettings));

        const appUrl = `${baseUrl}/api/apps/`;

        setPluginsAppUrl(pluginSettings, appUrl);

        const programsResults = await refetchPrograms();
        const programIds: string[] = programsResults?.results?.programs?.map(program => program.id) || [];

        if (programIds.length === 0) {
            showSnackbar({
                key: 'no-programs-error',
                message: i18n.t('No Programs available.'),
                severity: SnackbarSeverity.WARNING,
            });
            setIsLoading(false);
            return;
        }

        const enrollmentOverviewLayout = programIds.reduce(
            (acc: any, programId: string) => {
                acc[programId] = pluginSettings;
                return acc;
            },
            {},
        );

        mutateEnrollmentOverviewLayout({ data: enrollmentOverviewLayout })
            .then((response) => {
                if (response.httpStatus === 'OK') {
                    showSnackbar({
                        key: 'settings-update-success',
                        message: i18n.t('Plugins configuration restored successfully.'),
                        duration: 3000,
                        severity: SnackbarSeverity.SUCCESS,
                    });
                } else {
                    showSnackbar({
                        key: 'settings-update-error',
                        message: response.message || i18n.t('Error updating Data Store.'),
                        severity: SnackbarSeverity.CRITICAL,
                    });
                }
                setIsLoading(false);
            });
    };

    return (<Button
        destructive
        secondary
        onClick={handleRestorePlugins}
        loading={isLoading}
        disabled={loadingUpdate || loadingPrograms || baseUrlLoading}
        icon={<FiEdit />}
    >
        {i18n.t('Overwrite plugins configuration for all Programs')}
    </Button>);
};

export default PluginsRestorer;

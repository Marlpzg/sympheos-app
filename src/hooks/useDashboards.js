import useSWR from 'swr';

import { useConfig } from '@dhis2/app-runtime';
import { fetcher } from '../api';
import { API_PATH_DASHBOARDS } from '../constants/paths';
import { getAbsoluteUrl } from '../utils';

export const useDashboards = () => {
    const { baseUrl } = useConfig();
    const dashboardsUrl = getAbsoluteUrl(baseUrl, API_PATH_DASHBOARDS);

    const { data, error, isLoading } = useSWR(dashboardsUrl, fetcher);

    return {
        dashboards: data?.dashboards,
        isLoading,
        isError: error,
    };
};

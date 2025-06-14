import useSWR from 'swr';

import { useConfig } from '@dhis2/app-runtime';
import { API_PATH_SYSTEM_INFO } from '../constants/paths';
import { fetcher } from '../api';
import { getAbsoluteUrl } from '../utils';

export const useSystemInfo = () => {
    const { baseUrl } = useConfig();
    const systemInfoUrl = getAbsoluteUrl(baseUrl, API_PATH_SYSTEM_INFO);
    const { data, error, isLoading } = useSWR(systemInfoUrl, fetcher);

    return {
        systemInfo: data,
        isLoading,
        isError: error,
    };
};

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import { AppContext } from '../context';
import * as actionTypes from '../constants/action-types';
import { API_PATH_DASHBOARDS } from '../constants/paths';
import { getAbsoluteUrl } from '../utils';

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext() must be used within the AppContext');
    }

    const [state, dispatch] = context;
    const history = useHistory();
    const { mutate } = useSWRConfig();

    const closeDialog = () => {
        history.goBack();
    };

    const revalidateDashboards = (activeDashboardId) => {
        const mutateDashboards = async () => {
            const response = await mutate(
                getAbsoluteUrl(state.baseUrl, API_PATH_DASHBOARDS),
            );

            if (response) {
                setDashboards(response?.dashboards);
                setActiveDashboard(activeDashboardId ?? state?.activeDashboard?.id);
            }
        };

        mutateDashboards();
    };

    const setDashboards = (dashboards) => {
        dispatch({
            type: actionTypes.SET_DASHBOARDS,
            payload: {
                dashboards,
            },
        });
    };

    const setActiveDashboard = (id) => {
        dispatch({
            type: actionTypes.SET_ACTIVE_DASHBOARD,
            payload: { id },
        });
    };

    const setDeleteDashboard = (id) => {
        dispatch({
            type: actionTypes.DELETE_DASHBOARD,
            payload: { id },
        });
    };

    const setDashboardFilter = (filter) => {
        dispatch({
            type: actionTypes.SET_DASHBOARD_FILTER,
            payload: { filter },
        });
    };

    return {
        ...state,
        dispatch,
        closeDialog,
        revalidateDashboards,
        setActiveDashboard,
        setDashboards,
        setDashboardFilter,
        setDeleteDashboard,
    };
};

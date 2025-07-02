import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '@dhis2/app-runtime';
import { appReducer } from './reducer';

import * as actionTypes from './constants/action-types';
import { useDashboards } from './hooks/useDashboards';
import { useSystemInfo } from './hooks/useSystemInfo';

const AppContext = createContext({});

const initialState = {
    dashboards: [],
    activeDashboard: null,
    dashboardFilter: '',
    baseUrl: '',
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const value = [state, dispatch];

    const { baseUrl } = useConfig();
    const { systemInfo } = useSystemInfo();
    const { dashboards } = useDashboards();

    useEffect(() => {
        if (baseUrl) {
            dispatch({
                type: actionTypes.SET_API_BASE_URL,
                payload: { baseUrl },
            });
        }

        if (systemInfo) {
            dispatch({
                type: actionTypes.SET_SYSTEM_INFO,
                payload: { systemInfo },
            });
        }
    }, [systemInfo, baseUrl]);

    useEffect(() => {
        if (!dashboards) {
            return;
        }

        dispatch({
            type: actionTypes.SET_DASHBOARDS,
            payload: { dashboards },
        });
    }, [dashboards]);

    return (<AppContext.Provider value={value}>{children}</AppContext.Provider>);
};

AppProvider.propTypes = {
    children: PropTypes.element.isRequired,
};

export { AppProvider, AppContext };

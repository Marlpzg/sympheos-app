import * as actionTypes from './constants/action-types';

export const appReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
    case actionTypes.SET_DASHBOARDS:
        return { ...state, dashboards: payload.dashboards };
    case actionTypes.SET_ACTIVE_DASHBOARD:
        return {
            ...state,
            activeDashboard: payload.id
                ? state?.dashboards?.find(d => d.id === payload.id)
                : null,
        };
    case actionTypes.SET_SYSTEM_INFO:
        return {
            ...state,
            systemInfo: payload.systemInfo,
        };
    case actionTypes.SET_DASHBOARD_FILTER:
        return {
            ...state,
            dashboardFilter: payload.filter,
        };
    case actionTypes.SET_API_BASE_URL:
        return {
            ...state,
            baseUrl: payload.baseUrl,
        };

    default:
        return state;
    }
};

import React, { useEffect, useRef, useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { ErrorBoundary } from 'react-error-boundary';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { Center, CircularLoader } from '@dhis2/ui';
import Notice from 'sympheos-core/dashboard/Notice';

import 'sympheos-core/dashboard/dashboard.css';

import { apiFetchGuestToken, apiFetchDashboards } from './../../../api';
import { useAppContext } from './../../../hooks/useAppContext';

const DashboardContainer = ({
    dashboardId,
    options = {
        hideChartControls: false,
        expandFilters: false,
        showFilters: true,
    },
}) => {
    const dashboardFrame = useRef(null);
    const {
        baseUrl,
        systemInfo,
    } = useAppContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Unmount current dashboard.
     */
    const unmount = () => {
        dashboardFrame?.current?.replaceChildren();
    };

    useEffect(() => {
        if (!dashboardId) {
            setError('No active dashboard to display');
            setLoading(false);
            return;
        }

        const renderDashboard = async () => {
            setLoading(true);
            setError(null);
            unmount();

            const data = await apiFetchGuestToken(dashboardId, { baseUrl });
            const dashboards = await apiFetchDashboards({ baseUrl });

            const currentDashboard = dashboards?.dashboards?.find(d => d.id === dashboardId);

            if (data && currentDashboard && systemInfo && dashboardFrame?.current) {
                if (data?.token === undefined) {
                    setError(data?.message);
                    setLoading(false);

                    return;
                }

                embedDashboard({
                    id: currentDashboard?.supersetEmbedId,
                    supersetDomain: systemInfo?.supersetBaseUrl,
                    mountPoint: dashboardFrame.current,
                    fetchGuestToken: () => data?.token,
                    dashboardUiConfig: {
                        hideTitle: true,
                        hideTab: true,
                        hideChartControls: options.hideChartControls,
                        filters: {
                            expanded: options.expandFilters,
                            visible: options.showFilters,
                        },
                    },
                    debug: true,
                });

                setLoading(false);
            }
        };

        renderDashboard();
    }, [dashboardFrame, dashboardId, systemInfo]);

    return (
        <div className="dashboard-container">
            <ErrorBoundary
                fallbackRender={({ error: myError }) => (
                    <Notice
                        title={i18n.t('Load dashboard failed')}
                        message={`${i18n.t('This dashboard could not be loaded. Please try again later.')} ${myError}`}
                    />
                )}
            >

                {loading ? (
                    <Center>
                        <CircularLoader />
                    </Center>
                ) : null}

                {error ? (
                    <Notice
                        title={i18n.t('Load dashboard failed')}
                        message={error}
                    />
                ) : null}

                <div
                    className={!loading ? 'dashboard-frame' : 'hide'}
                    ref={dashboardFrame}
                />

            </ErrorBoundary>
        </div>
    );
};

export default DashboardContainer;

import React, { useEffect, useRef, useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { ErrorBoundary } from 'react-error-boundary';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { Center, CircularLoader } from '@dhis2/ui';
import Notice from 'sympheos-core/dashboard/Notice';

import { DashboardStyles } from 'sympheos-core/dashboard/dashboardStyles';

const DashboardContainer = ({
    supersetEmbedId,
    options = {
        hideChartControls: false,
        expandFilters: false,
        showFilters: true,
    },
}) => {
    const dashboardFrame = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Unmount current dashboard.
     */
    const unmount = () => {
        dashboardFrame?.current?.replaceChildren();
    };

    useEffect(() => {
        if (!supersetEmbedId) {
            setError('No active dashboard to display');
            setLoading(false);
            return;
        }

        const renderDashboard = async () => {
            setLoading(true);
            setError(null);
            unmount();

            if (dashboardFrame?.current) {
                embedDashboard({
                    id: supersetEmbedId,
                    supersetDomain: 'https://analytics.northshore.baosystems.com',
                    mountPoint: dashboardFrame.current,
                    fetchGuestToken: () => '',
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
                }).catch((err) => {
                    console.error('Error embedding dashboard:', err);
                });

                setLoading(false);
            }
        };

        renderDashboard();
    }, [dashboardFrame, supersetEmbedId, options]);

    return (
        <div style={DashboardStyles.dashboardContainer}>
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
                    style={!loading ? DashboardStyles.dashboardFrame : DashboardStyles.hide}
                    ref={dashboardFrame}
                />

            </ErrorBoundary>
        </div>
    );
};

export default DashboardContainer;

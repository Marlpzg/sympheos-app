// @flow
import React from 'react';
import { useDataEngine, useDataQuery, useDataMutation } from '@dhis2/app-runtime';
import log from 'loglevel';
import { EventBulkActions } from '../../EventWorkingListsCommon/EventBulkActions';
import { TrackedEntityBulkActionsComponent } from './TrackedEntityBulkActions.component';
import type { ContainerProps } from './TrackedEntityBulkActions.types';
import { errorCreator } from '../../../../../capture-core-utils';
import { Context } from './Actions/shared/Context';
import { getDataStoreValueQuery } from './Actions/shared/queries';
import { INSTANCE_TYPE, INSTANCE_TYPE_ID } from './Actions/shared/constants';

const teiUpdateMutation = {
    resource: 'trackedEntityInstances',
    id: ({ teiId }) => teiId,
    type: 'update',
    params: {
        strategy: 'merge',
    },
    data: ({ orgUnitId }) => ({
        orgUnit: orgUnitId,
    }),
};

export const TrackedEntityBulkActions = ({
    programStageId,
    stages,
    programDataWriteAccess,
    programId,
    ...passOnProps
}: ContainerProps) => {
    // eslint-disable-next-line no-unused-vars
    const FORCE_INSTANCE = {
        isAccountInstance: true,
        instanceType: INSTANCE_TYPE.ACCOUNT,
    };

    const { data } = useDataQuery({
        sympheosConfig: getDataStoreValueQuery(
            'sympheos_config',
            'settings',
        ),
    });

    const sympheosConfig = data?.sympheosConfig?.gatewayConnectivity ?? {};
    const isAccountInstance = sympheosConfig?.instanceType === INSTANCE_TYPE_ID.ACCOUNT;
    const instanceType = isAccountInstance ? INSTANCE_TYPE.ACCOUNT : INSTANCE_TYPE.GLOBAL;
    const dataEngine = useDataEngine();
    const [mutate] = useDataMutation(teiUpdateMutation);

    const onHandleUpdate = React.useCallback(
        async (
            teiId: string,
            orgUnitId: string,
        ) => {
            try {
                const response = await mutate({ teiId, orgUnitId });
                return response;
            } catch (error) {
                return error;
            }
        }, [mutate]);

    if (programStageId) {
        const stage = stages.get(programStageId);

        if (!stage) {
            log.error(errorCreator('Program stage not found')({ programStageId, stages }));
            throw new Error('Program stage not found');
        }

        return (
            <EventBulkActions
                stage={stage}
                {...passOnProps}
            />
        );
    }

    return (
        <Context.Provider
            value={{
                dataEngine,
                sympheosConfig: {
                    ...sympheosConfig,
                    isAccountInstance,
                    instanceType,
                    // ...FORCE_INSTANCE // To Force instance type. Comment this line for production or if you do not wish to force it
                },
                onHandleUpdate,
            }}
        >
            <TrackedEntityBulkActionsComponent
                programId={programId}
                stages={stages}
                programDataWriteAccess={programDataWriteAccess}
                {...passOnProps}
            />
        </Context.Provider>
    );
};

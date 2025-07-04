// @flow
import log from 'loglevel';
import React, { useEffect, useState } from 'react';
import { BulkActionBar } from '../../WorkingListsBase/BulkActionBar';
import type { ProgramStage } from '../../../../metaData';
import { SelectAction } from '../../TeiWorkingLists/TrackedEntityBulkActions/Actions';
import { tabsDeviceActions } from '../../TeiWorkingLists/TrackedEntityBulkActions/Actions/shared/actions';
import { useTrackedEntitiesFromEvents } from './hooks/useTrackedEntitiesFromEvents';

type Props = {|
    selectedRows: { [key: string]: boolean },
    onClearSelection: () => void,
    stage: ProgramStage,
    onUpdateList: (disableClearSelection?: boolean) => void,
|}

export const EventBulkActions = ({
    selectedRows,
    stage,
    onClearSelection,
    onUpdateList,
}: Props) => {
    const selectedRowsCount = Object.keys(selectedRows).length;
    const [eventIdList, setEventIdList] = useState([]);

    // get all the tei related the events removing duplicates
    useEffect(() => {
        const events = [...new Set(Object.keys(selectedRows).filter(row => selectedRows[row]))];
        setEventIdList(events);
    }, [selectedRows]);

    const { teis, loading, error, refetch: refetchTeis } = useTrackedEntitiesFromEvents(eventIdList);

    useEffect(() => {
        if (eventIdList.length <= 0) {
            return;
        }
        refetchTeis({ eventIds: eventIdList }).then(data => log.info(data));
    }, [eventIdList, refetchTeis]);

    if (!selectedRowsCount || error || loading) {
        return null;
    }

    return (
        <BulkActionBar
            selectedRowsCount={selectedRowsCount}
            onClearSelection={onClearSelection}
        >
            {tabsDeviceActions.map(action => (
                selectedRowsCount > 0 ? (
                    <SelectAction
                        selectedRows={teis}
                        programDataWriteAccess={null}
                        programId={stage.id}
                        onActionDone={onUpdateList}
                        key={action.id}
                        action={action}
                    >
                        {action.title}
                    </SelectAction>
                ) : null
            ))}
        </BulkActionBar>
    );
};

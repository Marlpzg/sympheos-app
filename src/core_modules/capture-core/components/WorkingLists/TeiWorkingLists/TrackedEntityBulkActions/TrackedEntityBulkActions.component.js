// @flow
import React from 'react';
import { BulkActionBar } from '../../WorkingListsBase/BulkActionBar';
import { CompleteAction } from './Actions';
import type { Props } from './TrackedEntityBulkActions.types';
import { RequestAction } from './Actions/RequestAction';

export const TrackedEntityBulkActionsComponent = ({
    selectedRows,
    programId,
    stages,
    programDataWriteAccess,
    onClearSelection,
    onUpdateList,
    removeRowsFromSelection,
}: Props) => {
    const selectedRowsCount = Object.keys(selectedRows).length;

    if (!selectedRowsCount) {
        return null;
    }

    return (
        <BulkActionBar
            selectedRowsCount={selectedRowsCount}
            onClearSelection={onClearSelection}
        >
            <CompleteAction
                programId={programId}
                programDataWriteAccess={programDataWriteAccess}
                selectedRows={selectedRows}
                stages={stages}
                onUpdateList={onUpdateList}
                removeRowsFromSelection={removeRowsFromSelection}
            />

            <RequestAction
                selectedRows={selectedRows}
                programDataWriteAccess={programDataWriteAccess}
                programId={programId}
                onActionDone={onUpdateList}
            />
        </BulkActionBar>
    );
};

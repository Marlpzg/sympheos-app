// @flow
import React from 'react';
import { BulkActionBar } from '../../WorkingListsBase/BulkActionBar';
import { RequestAction, UpdateAction, TaskAction, SecurityAction } from './Actions';
import type { Props } from './TrackedEntityBulkActions.types';

export const TrackedEntityBulkActionsComponent = ({
    selectedRows,
    programId,
    programDataWriteAccess,
    onClearSelection,
    onUpdateList,
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
            <RequestAction
                selectedRows={selectedRows}
                programDataWriteAccess={programDataWriteAccess}
                programId={programId}
                onActionDone={onUpdateList}
            />
            <UpdateAction
                selectedRows={selectedRows}
                programDataWriteAccess={programDataWriteAccess}
                programId={programId}
                onActionDone={onUpdateList}
            />
            <SecurityAction
                selectedRows={selectedRows}
                programDataWriteAccess={programDataWriteAccess}
                programId={programId}
                onActionDone={onUpdateList}
            />
            <TaskAction
                selectedRows={selectedRows}
                programDataWriteAccess={programDataWriteAccess}
                programId={programId}
                onActionDone={onUpdateList}
            />

        </BulkActionBar>
    );
};

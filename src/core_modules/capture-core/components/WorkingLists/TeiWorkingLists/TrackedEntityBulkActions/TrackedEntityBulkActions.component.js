// @flow
import React, { useContext } from 'react';
import { BulkActionBar } from '../../WorkingListsBase/BulkActionBar';
import { SelectAction } from './Actions';
import type { Props } from './TrackedEntityBulkActions.types';
import { tabsDeviceActions } from './Actions/shared/actions';
import { Context } from './Actions/shared/Context';

export const TrackedEntityBulkActionsComponent = ({
    selectedRows,
    programId,
    programDataWriteAccess,
    onClearSelection,
    onUpdateList,
}: Props) => {
    const context = useContext(Context);

    const isBlackListed = (action) => {
        const instanceType = context?.sympheosConfig?.instanceType;
        return !!action.blackList?.includes?.(instanceType);
    };

    const selectedRowsCount = Object.keys(selectedRows).length;

    if (!selectedRowsCount) {
        return null;
    }
    const teiList = [...new Set(Object.keys(selectedRows).filter(row => selectedRows[row]))];

    return (
        <BulkActionBar
            selectedRowsCount={selectedRowsCount}
            onClearSelection={onClearSelection}

        >
            {tabsDeviceActions.map(action => (
                !isBlackListed(action) ? (
                    <SelectAction
                        selectedRows={teiList}
                        programDataWriteAccess={programDataWriteAccess}
                        programId={programId}
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

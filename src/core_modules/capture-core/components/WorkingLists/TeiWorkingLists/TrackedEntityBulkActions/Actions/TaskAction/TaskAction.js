// @flow

import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useAuthority } from 'capture-core/utils/userInfo/useAuthority';
import { TaskActionModal } from './TaskActionModal';

type Props = {
    selectedRows: { [id: string]: boolean },
}


// TODO - Change to proper type when available
const CASCADE_DELETE_TEI_AUTHORITY = 'F_TEI_CASCADE_DELETE';

export const TaskAction = ({
    selectedRows,
}: Props) => {
    const [option, setOption] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { hasAuthority } = useAuthority({ authority: CASCADE_DELETE_TEI_AUTHORITY });

    if (!hasAuthority) {
        return null;
    }

    const handleSelectionChange = ({ selected }) => {
        setOption(selected.value);
        setIsModalOpen(true);
        // onActionDone();
    };

    const taskOptions = [
        { label: i18n.t('Task 1'), value: 't1' },
    ];

    return (
        <>
            <SingleSelectField
                dense
                onChange={handleSelectionChange}
                placeholder={i18n.t('Tasks')}
            >
                {taskOptions.map(item => (
                    <SingleSelectOption
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}

            </SingleSelectField>

            {isModalOpen && (
                <TaskActionModal onClose={() => setIsModalOpen(false)} selectedRows={selectedRows} option={option} />
            )}
        </>
    );
};

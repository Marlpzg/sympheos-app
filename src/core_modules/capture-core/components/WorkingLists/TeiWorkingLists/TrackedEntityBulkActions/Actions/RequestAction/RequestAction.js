// @flow

import React, { useState } from 'react';
import log from 'loglevel';
import i18n from '@dhis2/d2-i18n';
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useAuthority } from 'capture-core/utils/userInfo/useAuthority';
import { RequestActionModal } from './RequestActionModal';

type Props = {
    selectedRows: { [id: string]: boolean },
    onActionDone: () => void,
}


// TODO - Change to proper type when available
const CASCADE_DELETE_TEI_AUTHORITY = 'F_TEI_CASCADE_DELETE';

export const RequestAction = ({
    selectedRows,
    onActionDone,
}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { hasAuthority } = useAuthority({ authority: CASCADE_DELETE_TEI_AUTHORITY });

    if (!hasAuthority) {
        return null;
    }

    const handleSelectionChange = ({ selected }) => {
        setIsModalOpen(true);
        log.info(`selected ${selected.value} for ${Object.keys(selectedRows).length} TEIs`);
        onActionDone();
    };

    const updatesValues = [
        { label: i18n.t('Update Location'), value: 'update-location' },
        { label: i18n.t('Update Profile'), value: 'update-profile' },
        { label: i18n.t('Overwrite Profile'), value: 'overwrite-profile' },
        { label: i18n.t('Update Firmware'), value: 'update-firmware' },
        { label: i18n.t('Clear Requested Firmware'), value: 'clear-requested-firmware' },
        { label: i18n.t('Update APN'), value: 'update-apn' },
        { label: i18n.t('Update Band Priority'), value: 'update-band-priority' },
    ];

    return (
        <>
            <SingleSelectField
                dense
                onChange={handleSelectionChange}
                placeholder={i18n.t('Updates')}
            >
                {updatesValues.map(item => (
                    <SingleSelectOption
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}

            </SingleSelectField>

            {isModalOpen && (
                <RequestActionModal onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

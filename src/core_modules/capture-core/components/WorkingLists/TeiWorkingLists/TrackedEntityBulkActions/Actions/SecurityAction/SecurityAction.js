// @flow

import React, { useState } from 'react';
import log from 'loglevel';
import i18n from '@dhis2/d2-i18n';
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useAuthority } from 'capture-core/utils/userInfo/useAuthority';
import { SecurityActionModal } from './SecurityActionModal';

type Props = {
    selectedRows: { [id: string]: boolean },
    onActionDone: () => void,
}


// TODO - Change to proper type when available
const CASCADE_DELETE_TEI_AUTHORITY = 'F_TEI_CASCADE_DELETE';

export const SecurityAction = ({
    selectedRows,
    onActionDone,
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
        log.info(`selected ${selected.value} for ${Object.keys(selectedRows).length} TEIs`);
        onActionDone();
    };

    const securityOptions = [
        { label: i18n.t('Resend Auth Key'), value: 'resend-auth-key' },
        { label: i18n.t('Resend SSH Key'), value: 'resend-ssh-key' },
    ];

    return (
        <>
            <SingleSelectField
                dense
                onChange={handleSelectionChange}
                placeholder={i18n.t('Security')}
                inputWidth="150px"
            >
                {securityOptions.map(item => (
                    <SingleSelectOption
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}

            </SingleSelectField>

            {isModalOpen && (
                <SecurityActionModal onClose={() => setIsModalOpen(false)} selectedRows={selectedRows} option={option} />
            )}
        </>
    );
};

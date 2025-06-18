// @flow

import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useAuthority } from 'capture-core/utils/userInfo/useAuthority';
import { RequestActionModal } from './RequestActionModal';
import { actionTypes } from '../shared/actions/actionTypes'
;
import { tabsDeviceActions } from '../shared/actions';


type Props = {
    selectedRows: { [id: string]: boolean }
}


// TODO - Change to proper type when available
const CASCADE_DELETE_TEI_AUTHORITY = 'F_TEI_CASCADE_DELETE';

export const RequestAction = ({
    selectedRows,
}: Props) => {
    const [option, setOption] = useState(actionTypes.requests.sendInfo);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { hasAuthority } = useAuthority({ authority: CASCADE_DELETE_TEI_AUTHORITY });


    if (!hasAuthority) {
        return null;
    }

    const handleSelectionChange = ({ selected }) => {
        setOption(selected.value);
        setIsModalOpen(true);
    };

    const reqActions = tabsDeviceActions[0].actions;

    return (
        <>
            <SingleSelectField
                dense
                onChange={handleSelectionChange}
                placeholder={i18n.t('Requests')}
                inputWidth="150px"
            >
                {reqActions.map(action => (
                    <SingleSelectOption
                        key={action.type}
                        label={action.label}
                        value={action.type}
                    />
                ))}

            </SingleSelectField>

            {isModalOpen && (
                <RequestActionModal onClose={() => setIsModalOpen(false)} selectedRows={selectedRows} option={option} />
            )}
        </>
    );
};

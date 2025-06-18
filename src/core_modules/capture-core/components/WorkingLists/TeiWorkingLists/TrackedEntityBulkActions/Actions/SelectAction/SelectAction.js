// @flow
import React, { useContext, useState } from 'react';

import { useAlert, useDataMutation } from '@dhis2/app-runtime';
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useAuthority } from 'capture-core/utils/userInfo/useAuthority';
import { ConfirmationModal } from './SelectActionModal';
import type { TabDeviceAction } from '../shared/actions/tabsDeviceActions.types';
import { actions } from '../shared/actions';
import { SMSCommandService, TEAService } from '../shared/services';
import { alertMessages } from '../shared/constants';
import { updateTrackedEntityInstanceQuery } from '../shared/queries';
import { buildConfirmationMessage } from '../shared/utils/stringUtils';
import { Context } from '../shared/Context';


type Props = {
    selectedRows: { [id: string]: boolean },
    onActionDone: () => void,
    action: TabDeviceAction,
    programId: string,

}

const CASCADE_DELETE_TEI_AUTHORITY = 'F_TEI_CASCADE_DELETE';

export const SelectAction = ({
    selectedRows,
    onActionDone,
    action,
    programId,
}: Props) => {
    const context = useContext(Context);
    const [mutate] = useDataMutation(updateTrackedEntityInstanceQuery);
    // const [attributes, setAttributes] = useState({});
    const [option, setOption] = useState('');
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const { hasAuthority } = useAuthority({ authority: CASCADE_DELETE_TEI_AUTHORITY });
    const [selectedAction, setSelectedAction] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    // const [formValues, setFormValues] = useState({});
    // const [isFormValid, setIsFormValid] = useState(false);
    const { dataEngine, sympheosConfig } = context;

    const { show: showAlert } = useAlert(
        ({ message }) => message,
        ({ params }) => params,
    );

    /*
    useEffect(() => {
        const enrollmentAttributes = data?.enrollment?.attributes;

        if (enrollmentAttributes?.length > 0) {
            const mappedAttributesByCode = mapAttributesByCode(enrollmentAttributes);
            setAttributes(mappedAttributesByCode);
        }
    }, [data]); */


    if (!hasAuthority) {
        return null;
    }


    const showSuccessAlert = () => {
        showAlert({
            message: alertMessages.success,
            params: { success: true },
        });
    };

    const showErrorAlert = () => {
        showAlert({
            message: alertMessages.error,
            params: { critical: true },
        });
    };


    const handleSelectionChange = ({ selected }) => {
        setOption(selected);
        // attributes?.DV_SSH_KEY?.value ?? ''
        const actionClicked = actions({ enrollmentId: '' }, null)?.[selected] ?? null;

        if (!actionClicked) {
            return null;
        }
        // setIsModalOpen(true);
        const { fields, smsCommand, updateTEA } = actionClicked;
        const hasFields = fields?.length > 0;

        setSelectedAction(actionClicked);
        setShowConfirmation(!hasFields && (smsCommand || updateTEA));
        // todo: remove this
        return null;
    };

    /* const onValueChange =
    fieldId =>
        (value, isValid = true) => {
            fieldsValid.current = {
                ...fieldsValid.current,
                [fieldId]: isValid,
            };

            const newIsFormValid = requiredFields.current.reduce(
                (acc, field) => acc && (fieldsValid.current[field] ?? false),
                true,
            );

            // setIsFormValid(newIsFormValid);
            setFormValues(prev => ({
                ...prev,
                [fieldId]: value,
            }));
        }; */

    const runUpdateTEA = async (teiId) => {
        if (!selectedAction) {
            return;
        }

        try {
            const {
                // updateTEA: { attribute, formValueField },
                updateTEA: { },
            } = selectedAction;

            const teaService = new TEAService(mutate);
            const response = await teaService.updateTEA(
                teiId,
                null,
                null,
                null, // formValues?.[formValueField] ?? '',
            );

            if (response.ok) {
                showSuccessAlert();
            } else if (response.error) {
                showErrorAlert();
            }
        } catch (error) {
            showErrorAlert();
        }
    };

    const runSMSCommand = async (teiId) => {
        try {
            const smsCommandService = new SMSCommandService({ dataEngine, sympheosConfig }, {
                orgUnitId: null,
                enrollmentId: null,
                teiId,
                programId,
            });
            const response = await smsCommandService.sendCommand(
                teiId,
                selectedAction?.smsCommand,
                null, // formValues,
            );

            if (response.ok) {
                showSuccessAlert();
            } else if (response.error) {
                showErrorAlert();
            }
        } catch (error) {
            showErrorAlert();
        }
    };

    // eslint-disable-next-line complexity
    const handleOnModalConfirm = () => {
        if (!selectedAction) {
            return;
        }
        const { smsCommand, updateTEA } = selectedAction;
        setShowLoading(true);

        const promises = Object.keys(selectedRows).filter(teiId => selectedRows[teiId]).map(async (teiId) => {
            if (updateTEA) {
                await runUpdateTEA(teiId);
            }

            if (smsCommand) {
                await runSMSCommand(teiId);
            }
        });

        try {
            Promise.all(promises);
        } finally {
            setShowLoading(false);
            setShowConfirmation(false);
            onActionDone();
        }
    };

    const handleOnModalClose = () => {
        setShowConfirmation(false);
        setOption(null);
    };
    return (
        <>
            <SingleSelectField
                dense
                onChange={handleSelectionChange}
                placeholder={action.title}
                inputWidth="150px"
                selected={option}
            >

                {action.actions.map(act => (
                    <SingleSelectOption
                        key={act.type}
                        label={act.label}
                        value={act.type}
                    />
                    // +type: ActionType,
                    // +blackList?: Array<InstanceType>,

                ))}
            </SingleSelectField>


            <ConfirmationModal
                // hasAuthority={hasAuthority}
                title={selectedAction?.title}
                show={showConfirmation}
                onClose={handleOnModalClose}
                onConfirm={handleOnModalConfirm}
                message={buildConfirmationMessage(selectedAction, null)}
                loading={showLoading}
            />

        </>
    );
};

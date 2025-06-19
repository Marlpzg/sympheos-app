// @flow
import React, { useContext, useEffect, useRef, useState } from 'react';

import { useAlert, useDataMutation } from '@dhis2/app-runtime';
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui';
import { useAuthority } from 'capture-core/utils/userInfo/useAuthority';
import { handleAPIResponse, REQUESTED_ENTITIES } from 'capture-core/utils/api';
import { featureAvailable, FEATURES } from 'capture-core-utils';
import { useApiDataQuery } from 'capture-core/utils/reactQueryHelpers';
import { ConfirmationModal } from './ConfirmationModal';
import type { TabDeviceAction } from '../shared/actions/tabsDeviceActions.types';
import type { Action } from '../shared/actions/actions';
import { actions } from '../shared/actions';
import { SMSCommandService, TEAService } from '../shared/services';
import { alertMessages } from '../shared/constants';
import { updateTrackedEntityInstanceQuery } from '../shared/queries';
import { buildConfirmationMessage } from '../shared/utils/stringUtils';
import { Context } from '../shared/Context';
import { FormActionModal } from './ FormActionModal';


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

    const [option, setOption] = useState('');
    const { hasAuthority } = useAuthority({ authority: CASCADE_DELETE_TEI_AUTHORITY });
    const [selectedAction, setSelectedAction] = useState<?Action>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showActionPage, setShowActionPage] = useState(false);
    const [formValues, setFormValues] = useState({});
    const fieldsValid = useRef({});
    const requiredFields = useRef([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const { dataEngine, sympheosConfig } = context;

    const { show: showAlert } = useAlert(
        ({ message }) => message,
        ({ params }) => params,
    );

    const clearForm = () => {
        setFormValues({});
        setIsFormValid(false);
        fieldsValid.current = {};
        requiredFields.current = [];
    };

    const {
        data: trackedEntities,
        isError: isTrackedEntitiesError,
        isLoading: isFetchingTrackedEntities,
    } = useApiDataQuery(
        ['WorkingLists', 'BulkActionBar', 'SelectAction', 'trackedEntities', selectedRows],
        {
            resource: 'tracker/trackedEntities',

            params: () => {
                const supportForFeature = featureAvailable(FEATURES.newEntityFilterQueryParam);
                const filterQueryParam: string = supportForFeature ? 'trackedEntities' : 'trackedEntity';

                return {
                    program: programId,
                    fields: `
                        trackedEntity,
                        attributes,
                        orgUnit,
                        enrollments[
                            enrollment,
                            orgUnit,
                            status,
                            enrollmentDate,
                            incidentDate,
                            program,
                        ]
                    `.replace(/\s+/g, ''), // eliminamos espacios innecesarios
                    [filterQueryParam]: Object.keys(selectedRows).join(supportForFeature ? ',' : ';'),
                    pageSize: 100,
                };
            },
        },
        {
            enabled: Object.keys(selectedRows).length > 0,
            select: (data: any) => {
                const apiTrackedEntities = handleAPIResponse(REQUESTED_ENTITIES.trackedEntities, data);
                return apiTrackedEntities;
            },
        },
    );


    useEffect(() => {
        const fieldsLength = selectedAction?.fields?.length ?? 0;
        clearForm();

        if (fieldsLength > 0) {
            const fields = selectedAction?.fields ?? [];

            requiredFields.current = fields.reduce((acc, field) => {
                if (field.params?.required) {
                    acc.push(field.formValueField);
                }
                return acc;
            }, []);
        }
    }, [selectedAction]);
    if (isTrackedEntitiesError || isFetchingTrackedEntities) {
        // showAlert({
        //     message: alertMessages.error,
        //     params: { critical: true },
        // });
    }


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
        // could we get one of the enrollments IDS?...
        setOption(selected);
        const actionClicked = actions({ enrollmentId: trackedEntities?.[0]?.enrollments?.[0]?.enrollment }, null)?.[selected] ?? null;

        if (!actionClicked) {
            return null;
        }
        // setIsModalOpen(true);
        const { fields, smsCommand, updateTEA } = actionClicked;
        const hasFields = fields?.length > 0;

        setSelectedAction(actionClicked);
        setShowConfirmation(!hasFields && (smsCommand || updateTEA));
        setShowActionPage(hasFields);


        // todo: remove this
        return null;
    };


    const onValueChange =
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

            setIsFormValid(newIsFormValid);
            setFormValues(prev => ({
                ...prev,
                [fieldId]: value,
            }));
        };
    const handleCloseActionPage = () => {
        setShowActionPage(false);
        setSelectedAction(null);
        setOption(null);
    };

    const runUpdateTEA = async (teiId, orgUnitId) => {
        if (!selectedAction) {
            return;
        }

        try {
            const { attribute, formValueField } = selectedAction?.updateTEA ?? {};

            const teaService = new TEAService(mutate);
            const response = await teaService.updateTEA(
                teiId,
                orgUnitId,
                attribute,
                formValues?.[formValueField] ?? '',
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

    const runSMSCommand = async (teiId, orgUnitId, enrollmentId) => {
        try {
            const smsCommandService = new SMSCommandService({ dataEngine, sympheosConfig }, {
                orgUnitId,
                enrollmentId,
                teiId,
                programId,
            });
            const response = await smsCommandService.sendCommand(
                teiId,
                selectedAction?.smsCommand,
                formValues,
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
            const { orgUnit: orgUnitId, enrollments } = trackedEntities?.find(trackedEntity => trackedEntity.trackedEntity === teiId) ?? {};
            const enrollmentId = enrollments?.[0]?.enrollment;
            if (updateTEA) {
                await runUpdateTEA(teiId, orgUnitId);
            }

            if (smsCommand) {
                await runSMSCommand(teiId, orgUnitId, enrollmentId);
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
                inputWidth="200px"
                selected={option}
            >

                {action.actions.map(act => (
                    <SingleSelectOption
                        key={act.type}
                        label={act.label}
                        value={act.type}
                        disabled={act.disabled}
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
            {selectedAction ? (
                <FormActionModal
                    show={showActionPage}
                    onClose={handleCloseActionPage}
                    selectedAction={selectedAction}
                    onValueChange={onValueChange}
                    setShowConfirmation={setShowConfirmation}
                    isFormValid={isFormValid}
                />
            ) : null}
        </>
    );
};

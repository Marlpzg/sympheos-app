// @flow

import { actions } from './Actions/hooks/actions';

const { useState } = require('react');

type useActionProps = {
    props: any | null,
    attributes: any | null,
    selectedRows: { [id: string]: boolean },
};
export const useAction = ({ props, attributes }: useActionProps) => {
    const [selectedAction, setSelectedAction] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleOnModalConfirm = async () => {
        const { smsCommand, updateTEA } = selectedAction;

        if (updateTEA) {
            try {
                const {
                    updateTEA: { attribute, formValueField },
                } = selectedAction;

                const teaService = new TEAService(mutate);
                const response = await teaService.updateTEA(
                    props.teiId,
                    props.orgUnitId,
                    attribute,
                    formValues?.[formValueField] ?? '',
                );

                if (response.ok) {
                    showSuccessAlert();
                }

                if (response.error) {
                    showErrorAlert();
                }
            } catch (error) {
                showErrorAlert();
            }
        }

        if (smsCommand) {
            try {
                const smsCommandService = new SMSCommandService(context, props);
                const response = await smsCommandService.sendCommand(
                    props.teiId,
                    selectedAction.smsCommand,
                    formValues,
                );

                if (response.ok) {
                    showSuccessAlert();
                }

                if (response.error) {
                    showErrorAlert();
                }
            } catch (error) {
                showErrorAlert();
            }
        }

        setShowLoading(false);
        setShowConfirmation(false);
    };

    const handleDeviceActionClick = (actionType: string) => () => {
        const actionClicked = actions(props, attributes)?.[actionType] ?? null;

        if (!actionClicked) {
            return;
        }

        const { fields, smsCommand, updateTEA } = actionClicked;
        const hasFields = fields?.length > 0;

        setSelectedAction(actionClicked);
        // setShowActionPage(hasFields);
        setShowConfirmation(!hasFields && (smsCommand || updateTEA));
    };

    return {
        handleOnModalConfirm,
        handleDeviceActionClick,
        selectedAction,
        showConfirmation,
    };
};

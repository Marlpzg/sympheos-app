// @flow
import { useState } from 'react';
import { TEAService } from './Actions/services/TEAService';
import { SMSCommandService } from './Actions/services/SMSCommandService';
import { actions } from './Actions/hooks/actions';

type Props = {|
    teiId: string,
    orgUnitId: string,
    mutate: Function,
    context: any,
    showSuccessAlert: () => void,
    showErrorAlert: () => void,
|};

type HookProps = {|
    props: Props,
    attributes: any | null,
    selectedRows: { [id: string]: boolean },
|};

type Action = {
    smsCommand: ?string,
    updateTEA: ?{
        attribute: string,
        formValueField: string,
    },
    confirm: boolean,
};

export const useAction = ({ props, attributes, selectedRows }: HookProps) => {
    const [selectedAction, setSelectedAction] = useState<?Action>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<{ [string]: any }>({});

    const handleUpdateTEA = async (action: Action) => {
        const { updateTEA } = action;
        if (!updateTEA) return;

        try {
            const { attribute, formValueField } = updateTEA;
            const teaService = new TEAService(props.mutate);
            const response = await teaService.updateTEA(
                props.teiId,
                props.orgUnitId,
                attribute,
                formValues?.[formValueField] ?? '',
            );
            if (response.ok) {
                props.showSuccessAlert();
            } else {
                props.showErrorAlert();
            }
        } catch (error) {
            props.showErrorAlert();
        }
    };

    const handleSmsCommand = async (action: Action) => {
        const { smsCommand } = action;
        if (!smsCommand) return;

        try {
            const smsCommandService = new SMSCommandService(props.context, props);
            const response = await smsCommandService.sendCommand(
                props.teiId,
                smsCommand,
                formValues,
            );
            if (response.ok) {
                props.showSuccessAlert();
            } else {
                props.showErrorAlert();
            }
        } catch (error) {
            props.showErrorAlert();
        }
    };

    const handleOnModalConfirm = async () => {
        if (!selectedAction) {
            return;
        }
        setLoading(true);
        await handleUpdateTEA(selectedAction);
        await handleSmsCommand(selectedAction);
        setLoading(false);
        setShowConfirmation(false);
    };

    const handleActionClick = (action: Action) => {
        setSelectedAction(action);
        if (action.confirm) {
            setShowConfirmation(true);
        } else {
            handleOnModalConfirm();
        }
    };

    return {
        actions: actions(props, attributes, selectedRows),
        selectedAction,
        showConfirmation,
        loading,
        formValues,
        setFormValues,
        handleActionClick,
        handleOnModalConfirm,
        handleClose: () => {
            setShowConfirmation(false);
        },
    };
};

// @flow
import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Button, ButtonStrip, Modal, ModalTitle, ModalContent, ModalActions } from '@dhis2/ui';
import type { Action } from '../shared/actions/actions';
import styles from './ FormActionModal.module.css';
import { FIELD_COMPONENT_TYPE } from '../shared/constants';
import { Input, Select } from '../shared/components';

const FieldComponent = {
    [FIELD_COMPONENT_TYPE.SELECT]: Select,
    [FIELD_COMPONENT_TYPE.INPUT]: Input,
};


type Props = {
    show: boolean,
    onClose: () => void,
    selectedAction: Action,
    onValueChange: (fieldId: string) => (value: string, isValid: boolean) => void,
    message?: string,
    setShowConfirmation: (boolean) => void,
    isFormValid: boolean,
};

export const FormActionModal = ({
    show,
    onClose,
    selectedAction,
    onValueChange,
    setShowConfirmation,
    isFormValid,
}: Props) => {
    const handleConfirm = () => {
        setShowConfirmation(true);
    };
    const fieldsLength = selectedAction?.fields?.length ?? 0;
    const fields = selectedAction?.fields ?? [];
    return (fieldsLength > 0 && show ? (
        <Modal onClose={onClose} large className={styles.container}>

            <ModalTitle className={styles.title}>
                { selectedAction.title}
            </ModalTitle>
            <ModalContent className={styles.content}>
                <form>
                    {fieldsLength > 0 ? fields.map((field) => {
                        const Component = FieldComponent[field.type];
                        if (!Component) return null;
                        return (
                            <div key={field.label}>
                                <Component
                                    {...field}
                                    key={field.label}
                                    onValueChange={onValueChange(field.formValueField)}
                                />
                                <br />
                            </div>
                        );
                    })
                        : null}
                </form>
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button key="cancel_button" onClick={onClose}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        key="ok_button"
                        disabled={!isFormValid}
                        onClick={handleConfirm}
                        primary
                    >
                        {i18n.t('OK')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    ) : null);
};

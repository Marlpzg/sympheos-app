// @flow
import React from 'react';
import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
} from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n';
import styles from './ConfirmationModal.module.css';


type Props = {
    show: boolean,
    onClose: () => void,
    onConfirm: () => void,
    message?: string,
    title?: string,
    loading?: boolean,
};

export const ConfirmationModal = ({
    show,
    onClose,
    onConfirm,
    message,
    title,
    loading,
}: Props) =>
    (show ? (
        <Modal onClose={onClose} large className={styles.container}>
            <ModalTitle className={styles.title}>
                {title || i18n.t('Confirm')}
            </ModalTitle>
            <ModalContent className={styles.content}>
                {message ?? i18n.t('Are you sure you want to proceed?')}
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button onClick={onClose} secondary>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button onClick={onConfirm} loading={loading} primary>
                        {i18n.t('Confirm')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    ) : null);

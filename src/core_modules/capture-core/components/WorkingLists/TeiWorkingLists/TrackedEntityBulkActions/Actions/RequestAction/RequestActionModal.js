// @flow
import log from 'loglevel';
import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from '@dhis2/ui';
import { useRequestEvents } from './RequestAction.functions';


type ModalProps = {
    onClose: () => void,
};

export const RequestActionModal = ({ onClose }: ModalProps) => {
    const { runAction } = useRequestEvents();

    const [isLoading, setIsLoading] = useState(false);
    const handleAsyncAction = async (asyncfunction: () => Promise<void>) => {
        try {
            setIsLoading(true);
            await asyncfunction();
        } catch (error) {
            setIsLoading(false);
            log.error(`Error running action: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            small
            onClose={onClose}
            dataTest={'bulk-delete-events-dialog'}
        >
            <ModalTitle>
                {i18n.t('Request action')}
            </ModalTitle>

            <ModalContent>
                {i18n.t('TODO')}
            </ModalContent>

            <ModalActions>
                <ButtonStrip>
                    <Button
                        secondary
                        onClick={() => onClose()}
                    >
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        primary
                        dataTest={'bulk-delete-events-confirm-button'}
                        dataKey={'confirm'}
                        onClick={handleAsyncAction(runAction)}
                        loading={isLoading}
                    >
                        {i18n.t('Run!')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal >
    );
};

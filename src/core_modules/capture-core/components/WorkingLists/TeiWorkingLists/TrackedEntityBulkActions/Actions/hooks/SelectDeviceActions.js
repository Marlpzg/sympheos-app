import i18n from '@dhis2/d2-i18n';
import { actionTypes } from './actionTypes';

export const SELECT = {
    REQUESTS: 'requests',
    UPDATES: 'updates',
    SECURITY: 'security',
    TASKS: 'tasks',
};

export const selectDeviceActions =
{
    [SELECT.REQUESTS]: {
        title: i18n.t('Requests'),
        actions: [
            {
                label: i18n.t('Send info'),
                type: actionTypes.requests.sendInfo,
            },
            {
                label: i18n.t('Request log files'),
                type: actionTypes.requests.sendLog,
            },
            {
                label: i18n.t('Device reboot'),
                type: actionTypes.requests.reboot,
            },
            {
                label: i18n.t('Reset Modem'),
                type: actionTypes.requests.resetModem,
            },
        ],
    },

    [SELECT.UPDATES]: {
        title: i18n.t('Updates'),
        actions: [
            {
                label: i18n.t('Update Instance'),
                type: actionTypes.updates.instanceSwitch,
            },
            {
                label: i18n.t('Update Profile'),
                type: actionTypes.updates.updateProfile,
            },
            {
                label: i18n.t('Overwrite Profile'),
                type: actionTypes.updates.overwriteProfile,
            },
            {
                label: i18n.t('Update Firmware'),
                type: actionTypes.updates.updateFirmware,
            },
            {
                label: i18n.t('Clear Requested Firmware'),
                type: actionTypes.updates.clearRequestedFirmware,
            },
            {
                label: i18n.t('Update APN'),
                type: actionTypes.updates.updateAPN,
            },
            {
                label: i18n.t('Update Band Priority'),
                type: actionTypes.updates.updateBandPriority,
            },
        ],
    },
    [SELECT.SECURITY]: {
        title: i18n.t('Security'),
        actions: [
            {
                label: i18n.t('Resend Auth Key'),
                type: actionTypes.security.resendAuthKey,
            },
            {
                label: i18n.t('Resend SSH Key'),
                type: actionTypes.security.resendSSHKey,
            },
        ],
    },
};

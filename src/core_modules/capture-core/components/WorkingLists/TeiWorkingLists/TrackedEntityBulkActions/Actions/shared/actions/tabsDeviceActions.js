// @flow

// TODO: review with the plugin project
import i18n from '@dhis2/d2-i18n';
import { actionTypes } from './actionTypes';
import { INSTANCE_TYPE } from '../constants';

type RequestsAction = $Values<typeof actionTypes.requests>;
type UpdatesAction = $Values<typeof actionTypes.updates>;
type SecurityAction = $Values<typeof actionTypes.security>;
export type ActionType = RequestsAction | UpdatesAction | SecurityAction;

export type InstanceType = $Values<typeof INSTANCE_TYPE>;

export type DeviceAction = {|
  +label: string,
  +type: ActionType,
  +blackList?: Array<InstanceType>,
  +disabled?: boolean,
|};

export type TabDeviceAction = {|
  +id: string,
  +title: string,
  +actions: Array<DeviceAction>,
|};

export type TabsDeviceActions = Array<TabDeviceAction>;

export const TABS = {
    REQUESTS: 'requests',
    UPDATES: 'updates',
    SECURITY: 'security',
};

export const tabsDeviceActions: TabsDeviceActions = [
    {
        id: TABS.REQUESTS,
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
    {
        id: TABS.UPDATES,
        title: i18n.t('Updates'),
        actions: [
            {
                label: i18n.t('Update Instance'),
                type: actionTypes.updates.instanceSwitch,
            },
            {
                label: i18n.t('Overwrite Profile'),
                type: actionTypes.updates.overwriteProfile,
            },
            {
                label: i18n.t('Update Profile'),
                type: actionTypes.updates.updateProfile,
            },
            {
                label: i18n.t('Overwrite Firmware'),
                type: actionTypes.updates.overwriteFirmware,
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
                blackList: [INSTANCE_TYPE.ACCOUNT], // Will not show on Account Instances
            },
            {
                label: i18n.t('Update Band Priority'),
                type: actionTypes.updates.updateBandPriority,
            },
        ],
    },
    {
        id: TABS.SECURITY,
        title: i18n.t('Security'),
        actions: [
            {
                label: i18n.t('Resend Auth Key'),
                type: actionTypes.security.resendAuthKey,
                disabled: true,
            },
            {
                label: i18n.t('Resend SSH Key'),
                type: actionTypes.security.resendSSHKey,
                disabled: true,
            },
        ],
    },
];


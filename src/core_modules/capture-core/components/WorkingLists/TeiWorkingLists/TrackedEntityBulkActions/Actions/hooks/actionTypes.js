export const actionTypes = {
    requests: {
        sendInfo: 'sendInfo',
        sendLog: 'sendLog',
        reboot: 'reboot',
        resetModem: 'resetModem',
    },
    updates: {
        instanceSwitch: 'instanceSwitch',
        updateProfile: 'updateProfile',
        overwriteProfile: 'overwriteProfile',
        updateFirmware: 'updateFirmware',
        clearRequestedFirmware: 'clearRequestedFirmware',
        updateAPN: 'updateAPN',
        updateBandPriority: 'updateBandPriority',
    },
    security: {
        resendAuthKey: 'resendAuthKey',
        resendSSHKey: 'resendSSHKey',
    },
};

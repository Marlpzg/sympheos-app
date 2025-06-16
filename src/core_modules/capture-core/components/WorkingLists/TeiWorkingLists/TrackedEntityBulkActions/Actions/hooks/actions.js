import i18n from '@dhis2/d2-i18n';
import { actionTypes } from './actionTypes';
import { ATTRIBUTE_IDS, OPTION_SET_IDS, SMS_COMMANDS } from '../constants';
import { isValidURL } from '../utils/urlUtils';

const confirmationMessage = i18n.t(
    'Are you sure you want to proceed with this operation?',
);

export const actions = (props, attributes) => ({
    [actionTypes.requests.sendInfo]: {
        title: i18n.t('Send Info'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.SEND_INFO,
    },
    [actionTypes.requests.sendLog]: {
        title: i18n.t('Request Log Files'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.SEND_LOG,
    },
    [actionTypes.requests.reboot]: {
        title: i18n.t('Device reboot'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.REBOOT,
    },
    [actionTypes.requests.resetModem]: {
        title: 'Reset Modem',
        confirmationMessage,
        smsCommand: SMS_COMMANDS.RESET_MODEM,
    },
    [actionTypes.updates.instanceSwitch]: {
        title: i18n.t('Update Instance'),
        fields: [
            {
                id: 'from_url_input',
                formValueField: 'fromUrl',
                type: 'input',
                label: i18n.t('From URL'),
                validate: value => isValidURL(value),
                params: {
                    required: true,
                    // We do this to avoid i18next-scanner error because otherwise it thinks we're using the colon (:) to identify a namespace
                    placeholder: i18n.t('e.g. {{protocol}}//example.com', { protocol: 'https:' }),
                    validationText: i18n.t('Please insert a valid URL'),
                },
                values: '',
            },
            {
                id: 'to_url_input',
                formValueField: 'toUrl',
                type: 'input',
                label: i18n.t('To URL'),
                validate: value => isValidURL(value),
                params: {
                    required: true,
                    placeholder: i18n.t('e.g. {{protocol}}//example.com', { protocol: 'https:' }),
                    validationText: i18n.t('Please insert a valid URL'),
                },
                values: '',
            },
        ],
        confirmationMessage,
        smsCommand: SMS_COMMANDS.INSTANCE_SWITCH,
    },
    [actionTypes.updates.updateProfile]: {
        title: i18n.t('Update Profile'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.UPDATE_CONFIG,
    },
    [actionTypes.updates.overwriteProfile]: {
        title: i18n.t('Overwrite Profile'),
        fields: [
            {
                id: 'profile_select', // ID of the field (e.g. used as a Key for the component)
                formValueField: 'requestedProfile', // key for the values object, and what we send in the SMS command request body
                type: 'select', // Type of component
                label: i18n.t('Profiles'), // Label of the component
                params: {
                    required: true,
                },
                query: {
                    optionSets: {
                        resource: 'optionSets',
                        id: OPTION_SET_IDS.PROFILE,
                        params: {
                            fields: 'options[:all]',
                            paging: false,
                        },
                    },
                    attributes: {
                        resource: `tracker/enrollments/${props.enrollmentId}`,
                        params: { fields: 'attributes', cacheBust: Date.now() },
                    },
                },
                defaultValueField: ATTRIBUTE_IDS.DV_REQUESTED_PROFILE,
                // values: [ // hardcoded values (when no http request is needed to get the values for the component)
                //   { label: "Firmware v1", value: "1" },
                //   { label: "Firmware v2", value: "2" },
                //   { label: "Firmware v3", value: "3" },
                // ],
            },
        ],
        confirmationMessage,
        updateTEA: {
            attribute: ATTRIBUTE_IDS.DV_REQUESTED_PROFILE,
            formValueField: 'requestedProfile',
        },
    },
    [actionTypes.updates.updateFirmware]: {
        title: i18n.t('Update Firmware'),
        fields: [
            {
                id: 'firmware_select',
                formValueField: 'firmware',
                type: 'select',
                label: i18n.t('Firmware'),
                params: {
                    required: true,
                },
                query: {
                    optionSets: {
                        resource: 'optionSets',
                        id: OPTION_SET_IDS.FIRMWARE,
                        params: {
                            fields: 'options[:all]',
                            paging: false,
                        },
                    },
                    attributes: {
                        resource: `tracker/enrollments/${props.enrollmentId}`,
                        params: { fields: 'attributes', cacheBust: Date.now() },
                    },
                },
                defaultValueField: ATTRIBUTE_IDS.DV_REQUESTED_FIRMWARE,
            },
        ],
        confirmationMessage,
        smsCommand: SMS_COMMANDS.UPDATE_FIRMWARE,
    },
    [actionTypes.updates.clearRequestedFirmware]: {
        title: i18n.t('Clear Requested Firmware'),
        confirmationMessage,
        updateTEA: {
            attribute: ATTRIBUTE_IDS.DV_REQUESTED_FIRMWARE,
            // No formValueField means the field will be cleared
        },
    },
    [actionTypes.updates.updateAPN]: {
        title: i18n.t('Update APN'),
        fields: [
            {
                id: 'apn_select',
                formValueField: 'apn',
                type: 'select',
                label: i18n.t('APN'),
                params: {
                    required: true,
                },
                query: {
                    // query used to fetch the values to populate the component
                    optionSets: {
                        resource: 'optionSets',
                        id: OPTION_SET_IDS.APN,
                        params: {
                            fields: 'options[:all]',
                            paging: false,
                        },
                    },
                    attributes: {
                        // query to get the attributes to get the default value of a field
                        resource: `tracker/enrollments/${props.enrollmentId}`,
                        params: { fields: 'attributes', cacheBust: Date.now() },
                    },
                },
                defaultValueField: ATTRIBUTE_IDS.DV_APN, // field used to pick the attribute value from the attributes query above
            },
        ],
        confirmationMessage,
        confirmationMessageValue: 'apn',
        smsCommand: SMS_COMMANDS.CHANGE_APN,
    },
    [actionTypes.updates.updateBandPriority]: {
        title: i18n.t('Update Band Priority'),
        fields: [
            {
                id: 'band_priority_select',
                formValueField: 'scanSequence',
                type: 'select',
                label: i18n.t('Band Priority'),
                params: {
                    required: true,
                },
                query: {
                    optionSets: {
                        resource: 'optionSets',
                        id: OPTION_SET_IDS.BAND_PRIORITY,
                        params: {
                            fields: 'options[:all]',
                            paging: false,
                        },
                    },
                },
            },
        ],
        confirmationMessage,
        smsCommand: SMS_COMMANDS.UPDATE_BAND_PRIORITY,
    },
    [actionTypes.security.resendAuthKey]: {
        title: 'Resend Auth Key',
        confirmationMessage,
        smsCommand: SMS_COMMANDS.SEND_KEY,
    },
    [actionTypes.security.resendSSHKey]: {
        title: i18n.t('Resend SSH Key'),
        fields: [
            {
                id: 'ssh_input',
                formValueField: 'key',
                type: 'input',
                label: i18n.t('SSH Key'),
                params: {
                    required: true,
                    validationText: i18n.t('Please insert a valid SSH Key'),
                },
                values: attributes?.DV_SSH_KEY?.value ?? '',
            },
        ],
        confirmationMessage,
        smsCommand: SMS_COMMANDS.SEND_SSH,
    },
});


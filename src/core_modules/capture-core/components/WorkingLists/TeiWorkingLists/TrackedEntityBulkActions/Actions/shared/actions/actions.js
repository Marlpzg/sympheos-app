import i18n from '@dhis2/d2-i18n';
import { actionTypes } from './actionTypes';
import { ATTRIBUTE_IDS, FIELD_COMPONENT_TYPE, OPTION_SET_IDS, SMS_COMMANDS } from '../constants';
import { getEnrollmentAttributesQuery, getOptionSetQuery } from '../queries';
// TODO: reiew with the plugin project
const confirmationMessage = i18n.t(
    'Are you sure you want to proceed with this operation?',
);

export const actions = (props, attributes) => ({
    [actionTypes.requests.sendInfo]: {
        title: i18n.t('Send Info'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.SEND_INFO,
        updateTEA: null,
    },
    [actionTypes.requests.sendLog]: {
        title: i18n.t('Request Log Files'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.SEND_LOG,
        updateTEA: null,
    },
    [actionTypes.requests.reboot]: {
        title: i18n.t('Device reboot'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.REBOOT,
        updateTEA: null,
    },
    [actionTypes.requests.resetModem]: {
        title: 'Reset Modem',
        confirmationMessage,
        smsCommand: SMS_COMMANDS.RESET_MODEM,
        updateTEA: null,
    },
    [actionTypes.updates.instanceSwitch]: {
        title: i18n.t('Update Instance'),
        fields: [
            {
                id: 'from_url_select',
                formValueField: 'dataPortalUrl',
                type: FIELD_COMPONENT_TYPE.SELECT,
                label: i18n.t('From URL'),
                params: {
                    required: true,
                },
                query: {
                    optionSets: getOptionSetQuery(OPTION_SET_IDS.UPDATE_INSTANCE_FROM),
                },
                values: '',
            },
            {
                id: 'to_url_select',
                formValueField: 'url',
                type: FIELD_COMPONENT_TYPE.SELECT,
                label: i18n.t('To URL'),
                params: {
                    required: true,
                },
                query: {
                    optionSets: getOptionSetQuery(OPTION_SET_IDS.UPDATE_INSTANCE_TO),
                },
                values: '',
            },
        ],
        confirmationMessage,
        smsCommand: SMS_COMMANDS.INSTANCE_SWITCH,
        updateTEA: null,
    },
    [actionTypes.updates.updateProfile]: {
        title: i18n.t('Update Profile'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.UPDATE_CONFIG,
        updateTEA: null,
    },
    [actionTypes.updates.overwriteProfile]: {
        title: i18n.t('Overwrite Profile'),
        fields: [
            {
                id: 'profile_select', // ID of the field (e.g. used as a Key for the component)
                formValueField: 'requestedProfile', // key for the values object, and what we send in the SMS command request body
                type: FIELD_COMPONENT_TYPE.SELECT, // Type of component
                label: i18n.t('Profiles'), // Label of the component
                params: {
                    required: true,
                },
                query: {
                    optionSets: getOptionSetQuery(OPTION_SET_IDS.PROFILE),
                    attributes: getEnrollmentAttributesQuery(props.enrollmentId),
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
        smsCommand: null,
    },
    [actionTypes.updates.overwriteFirmware]: {
        title: i18n.t('Overwrite Firmware'),
        fields: [
            {
                id: 'firmware_select',
                formValueField: 'requestedFirmware',
                type: FIELD_COMPONENT_TYPE.SELECT,
                label: i18n.t('Firmware'),
                params: {
                    required: true,
                },
                query: {
                    optionSets: getOptionSetQuery(OPTION_SET_IDS.FIRMWARE),
                    attributes: getEnrollmentAttributesQuery(props.enrollmentId),
                },
                defaultValueField: ATTRIBUTE_IDS.DV_REQUESTED_FIRMWARE,
            },
        ],
        confirmationMessage,
        updateTEA: {
            attribute: ATTRIBUTE_IDS.DV_REQUESTED_FIRMWARE,
            formValueField: 'requestedFirmware',
        },
        smsCommand: null,
    },
    [actionTypes.updates.updateFirmware]: {
        title: i18n.t('Update Firmware'),
        confirmationMessage,
        smsCommand: SMS_COMMANDS.UPDATE_FIRMWARE,
        updateTEA: null,
    },
    [actionTypes.updates.clearRequestedFirmware]: {
        title: i18n.t('Clear Requested Firmware'),
        confirmationMessage,
        updateTEA: {
            attribute: ATTRIBUTE_IDS.DV_REQUESTED_FIRMWARE,
        // No formValueField means the field will be cleared
        },
        smsCommand: null,
    },
    [actionTypes.updates.updateAPN]: {
        title: i18n.t('Update APN'),
        fields: [
            {
                id: 'apn_select',
                formValueField: 'apn',
                type: FIELD_COMPONENT_TYPE.SELECT,
                label: i18n.t('APN'),
                params: {
                    required: true,
                },
                query: {
                    optionSets: getOptionSetQuery(OPTION_SET_IDS.APN), // query used to fetch the values to populate the component
                    attributes: getEnrollmentAttributesQuery(props.enrollmentId), // query to get the attributes to get the default value of a field
                },
                defaultValueField: ATTRIBUTE_IDS.DV_APN, // field used to pick the attribute value from the attributes query above
            },
        ],
        confirmationMessage,
        confirmationMessageValue: 'apn',
        smsCommand: SMS_COMMANDS.CHANGE_APN,
        updateTEA: null,
    },
    [actionTypes.updates.updateBandPriority]: {
        title: i18n.t('Update Band Priority'),
        fields: [
            {
                id: 'band_priority_select',
                formValueField: 'scanSequence',
                type: FIELD_COMPONENT_TYPE.SELECT,
                label: i18n.t('Band Priority'),
                params: {
                    required: true,
                },
                query: {
                    optionSets: getOptionSetQuery(OPTION_SET_IDS.BAND_PRIORITY),
                },
            },
        ],
        confirmationMessage,
        smsCommand: SMS_COMMANDS.UPDATE_BAND_PRIORITY,
        updateTEA: null,
    },
    [actionTypes.security.resendAuthKey]: {
        title: 'Resend Auth Key',
        fields: [
            {
                id: 'auth_key_input',
                formValueField: 'key',
                type: FIELD_COMPONENT_TYPE.INPUT,
                label: i18n.t('Auth Key'),
                params: {
                    required: true,
                    validationText: i18n.t('Please insert a valid Auth Key'),
                },
                values: '',
            },
        ],
        confirmationMessage,
        smsCommand: SMS_COMMANDS.SEND_KEY,
        updateTEA: null,
    },
    [actionTypes.security.resendSSHKey]: {
        title: i18n.t('Resend SSH Key'),
        fields: [
            {
                id: 'ssh_input',
                formValueField: 'key',
                type: FIELD_COMPONENT_TYPE.INPUT,
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
        updateTEA: null,
    },
});

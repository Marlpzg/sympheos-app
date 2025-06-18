import ky from 'ky';
import {
    getAttributeFromRelationship,
    getAttributeValue,
} from '../utils/attributesUtils';
import { ATTRIBUTE_IDS, SMS_COMMANDS, HTTP_STATUS } from '../constants';
import {
    ACCOUNT_ATTRIBUTE_IDS,
    DEFAULT_PROFILE_ATTRIBUTE_IDS,
    TRACKED_ENTITY_TYPE_IDS,
} from '../constants/attributeIds';
import {
    getEnrollmentAttributesQuery,
    getTERelationshipsAttributesQuery,
} from '../queries';

const OK = data => ({ ok: true, data, error: false });
const ERROR = { ok: false, error: true };

export default class SMSCommandService {
  dataEngine;
  programId;
  orgUnitId;
  enrollmentId;
  teiId;
  sympheosConfig;
  baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.DHIS2_DEVICE_GATEWAY_API
        : '';

  constructor(
      { dataEngine, sympheosConfig },
      { orgUnitId, enrollmentId, teiId, programId },
  ) {
      this.dataEngine = dataEngine;
      this.programId = programId;
      this.orgUnitId = orgUnitId;
      this.enrollmentId = enrollmentId;
      this.teiId = teiId;
      this.sympheosConfig = sympheosConfig;
  }

  apiURL(id, operation) {
      return `${this.baseURL}/device-gateway/api/v1/gateways/${id}/${operation}`;
  }

  async getProfile() {
      try {
          const response = await this.dataEngine.query({
              enrollment: getEnrollmentAttributesQuery(this.enrollmentId),
              trackedEntity: getTERelationshipsAttributesQuery(this.teiId),
          });

          // Check if there's a requested profile
          const requestedProfile = getAttributeValue(
              response?.enrollment?.attributes,
              ATTRIBUTE_IDS.DV_REQUESTED_PROFILE,
          );

          // If there's a requested profile, we send that in the request
          if (requestedProfile) {
              return requestedProfile;
          }

          // If there's no requested profile and we're in an Account Instance, we send the default profile
          if (this.sympheosConfig.isAccountInstance) {
              return this.sympheosConfig.defaultProfile;
          }

          // Else, if we're in a Global instance, we send the default profile of the tracked entity Account
          const defaultProfile = getAttributeFromRelationship(
              response?.trackedEntity?.relationships,
              TRACKED_ENTITY_TYPE_IDS.ACCOUNT,
              DEFAULT_PROFILE_ATTRIBUTE_IDS[this.programId],
          );

          return defaultProfile;
      } catch (error) {
          return null;
      }
  }

  async getAuthKey() {
      try {
          if (this.sympheosConfig.isAccountInstance) {
              return this.sympheosConfig.authKey;
          }

          const response = await this.dataEngine.query({
              trackedEntity: getTERelationshipsAttributesQuery(this.teiId),
          });

          const gatewayAuthKey = getAttributeFromRelationship(
              response?.trackedEntity?.relationships,
              TRACKED_ENTITY_TYPE_IDS.ACCOUNT,
              ACCOUNT_ATTRIBUTE_IDS.AC_GATEWAY_AUTH_KEY,
          );

          return gatewayAuthKey;
      } catch (error) {
          return null;
      }
  }

  // eslint-disable-next-line class-methods-use-this
  async prepare(commandName) {
      if (!this) return {};
      switch (commandName) {
      // Leaving this commented as the requirements are constantly changing
      // It seems like all this functionality (getProfile) was implemented on the backend for now
      case SMS_COMMANDS.UPDATE_CONFIG: {
          // TODO: check with the plugin project
          return {};
          // const profile = await this.getProfile();
          // return profile ? { profile } : {};
      }
      // Leaving this commented as the requirements are constantly changing
      // case SMS_COMMANDS.SEND_KEY: {
      //   const key = await this.getAuthKey();
      //   return key
      //     ? {
      //         key,
      //       }
      //     : {};
      // }
      default:
          return {};
      }
  }

  async sendCommand(id, commandName, params = {}) {
      try {
          const url = this.apiURL(id, commandName);
          const prepareParams = await this.prepare(commandName);

          const response = await ky
              .post(url, { json: { ...params, ...prepareParams } })
              .json();

          if (
              response?.httpStatusCode === HTTP_STATUS.OK) {
              return OK(response);
          }
          return ERROR;
      } catch (error) {
          return ERROR;
      }
  }
}

import { HTTP_STATUS } from "../constants/httpStatus";

const OK = (data) => ({ ok: true, data, error: false });
const ERROR = { ok: false, error: true };

export default class TEAService {
  mutate;
  constructor(mutate) {
    this.mutate = mutate;
  }

  async updateTEA(teiId, orgUnit, attribute, value) {
    try {
      const response = await this.mutate({
        teiId,
        orgUnit,
        attributes: [
          {
            attribute,
            value,
          },
        ],
      });

      if (
        response?.httpStatusCode === HTTP_STATUS.OK &&
        response?.response?.status === "SUCCESS"
      ) {
        return OK(response);
      } else {
        return ERROR;
      }
    } catch (error) {
      return ERROR;
    }
  }
}

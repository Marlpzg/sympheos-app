/**
 * Builds a confirmation message for an action.
 *
 * If the action has a confirmationMessage defined, it will be used as the
 * confirmation message. If the action also has a confirmationMessageValue
 * defined, the value of the attribute with the provided code will be
 * inserted into the confirmation message where `{{value}}` is present.
 *
 * @param {Object} action - The action to build the confirmation message for.
 * @param {Object} values - The values of the attributes of the tracked entity.
 * @returns {String} The confirmation message.
 */
export const buildConfirmationMessage = (action, values) => {
  const { confirmationMessage, confirmationMessageValue } = action ?? {};

  if (!confirmationMessage) {
    return "";
  }

  if (!confirmationMessageValue || !values?.[confirmationMessageValue]) {
    return confirmationMessage;
  }

  return confirmationMessage.replace(
    "{{value}}",
    values[confirmationMessageValue]
  );
};

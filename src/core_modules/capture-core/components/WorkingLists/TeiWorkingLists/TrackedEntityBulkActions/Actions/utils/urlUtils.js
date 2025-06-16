// @flow
/**
 * Check if a given string is a valid URL.
 *
 * @param {String} str - The string to check.
 * @param {Array<String>} allowedProtocols - Optional. If provided, the function
 *   will only return true for URLs with a protocol that is in the provided
 *   array. Otherwise it will return true for any valid URL.
 * @returns {Boolean} true if the string is a valid URL, false otherwise.
 */
export const isValidURL = (str: string, allowedProtocols?: Array<string>) => {
    try {
        const url = new URL(str);
        return allowedProtocols?.includes?.(url.protocol) ?? true;
    } catch {
        return false;
    }
};

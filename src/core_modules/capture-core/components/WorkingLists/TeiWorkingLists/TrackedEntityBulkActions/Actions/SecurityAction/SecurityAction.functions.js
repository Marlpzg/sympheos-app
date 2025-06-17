// @flow
/**
 * Dummy runAction function that simulates an asynchronous action.
 * @returns {Promise<string>} A promise that resolves to a string message after a delay.
 */

export const useSecurityEvents = () => {
    const runAction = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return { runAction };
};

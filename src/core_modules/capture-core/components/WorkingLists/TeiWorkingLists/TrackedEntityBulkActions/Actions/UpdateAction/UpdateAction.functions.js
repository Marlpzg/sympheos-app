// @flow
/**
 * Dummy runAction function that simulates an asynchronous action.
 * @returns {Promise<string>} A promise that resolves to a string message after a delay.
 */

export const useUpdateEvents = () => {
    const runAction = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return { runAction };
};

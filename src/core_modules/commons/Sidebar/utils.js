import { LinkTypes } from './constants';

export const userHasAccess = (
    allowedUserGroups,
    userUserGroups,
) => {
    for (const group of allowedUserGroups) {
        if (userUserGroups[group]) {
            return true;
        }
    }
    return false;
};

export const optionIsActive = (location, item) => {
    const comparator = item.key || item.link;
    if (item.type === LinkTypes.CAPTURE) {
        const searchParams = location.search.split('?');
        const params = searchParams[searchParams.length - 1].split('&');

        let flag = false;
        params.forEach((param) => {
            const [paramKey, paramValue] = param.split('=');
            if (paramKey === 'programId' && paramValue === comparator) {
                flag = true;
            }
        });
        return flag;
    }

    return comparator === (location.pathname + location.search);
};

export const isMenuReady = (
    {
        menuHasContent,
        storeQueryLoading,
        localeLoading,
        userGroupsLoading,
    },
) => menuHasContent && !storeQueryLoading && !localeLoading && !userGroupsLoading;

export const menuHasErrors = (localeError, userGroupsError) => localeError || userGroupsError;

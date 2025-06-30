import { useDataEngine } from '@dhis2/app-runtime';
import { useQuery } from 'react-query';

export const useUserUserGroups = () => {
    const dataEngine = useDataEngine();

    const { data, isLoading, isError, error } = useQuery(
        ['userGroups'],
        () => dataEngine.query({
            userSettings: {
                resource: 'me',
                params: {
                    fields: 'userGroups[id]',
                },
            },
        }));

    return {
        userGroups: data?.userSettings?.userGroups?.reduce((groups, userGroup) => {
            groups[userGroup.id] = userGroup.id;
            return groups;
        }, {}),
        isLoading,
        isError,
        error,
    };
};

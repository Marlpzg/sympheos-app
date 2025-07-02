import { useDataQuery } from '@dhis2/app-runtime';
import { useEffect, useState } from 'react';

const buildQuery = {
    eventsQuery: {
        resource: 'tracker/events',
        params: ({ eventIds }) => ({
            events: eventIds,
            fields: ['event', 'trackedEntity'],
        }),
    },
};

/**
 * @param eventIds the list of event ids to get the tracked entities.
 * @returns the list of tracked entities related to the events without duplicates.
 */
export const useTrackedEntitiesFromEvents = () => {
    const [teis, setTeis] = useState([]);
    const { data, refetch, loading, error } = useDataQuery(buildQuery, { lazy: true, variables: { eventIds: [] } });

    useEffect(() => {
        const teiList = data?.eventsQuery?.events
            ?.map(e => e.trackedEntity)
            .filter(Boolean) ?? [];

        setTeis(teiList);
    }, [data]);

    return { teis: [...new Set(teis)], loading, error, refetch };
};

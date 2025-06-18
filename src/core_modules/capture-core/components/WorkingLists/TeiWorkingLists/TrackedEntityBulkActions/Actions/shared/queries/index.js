export const getEnrollmentQuery = {
    resource: 'tracker/enrollments',
    id: ({ enrollmentId }) => enrollmentId,
    params: { fields: '*' },
};

export const getEnrollmentAttributesQuery = enrollmentId => ({
    resource: `tracker/enrollments/${enrollmentId}`,
    params: { fields: 'attributes', cacheBust: Date.now() },
});

export const getTrackedEntityAttributesQuery = {
    resource: 'tracker/trackedEntities',
    id: ({ teiId }) => teiId,
    params: { fields: 'attributes' },
};

export const getTERelationshipsAttributesQuery = teiId => ({
    resource: `tracker/trackedEntities/${teiId}`,
    params: {
        fields: 'relationships[to[trackedEntity[trackedEntityType,attributes]]]',
    },
});

export const getDataStoreValueQuery = (namespace, key) => ({
    resource: `dataStore/${namespace}/${key}`,
});

export const updateTrackedEntityInstanceQuery = {
    resource: 'trackedEntityInstances',
    type: 'update',
    id: ({ teiId }) => teiId,
    data: ({ orgUnit, attributes }) => ({
        orgUnit,
        attributes,
    }),
};

export const getOptionSetQuery = id => ({
    resource: 'optionSets',
    id,
    params: {
        fields: 'options[:all]',
        paging: false,
    },
});

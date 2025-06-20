/**
 * Retrieves the value of an attribute from an array of attributes given its id.
 *
 * @param {Array} attributes - The array of attribute objects to search through.
 * @param {String} id - The id of the attribute to find.
 * @returns {String|Null} The value of the attribute with the given id, or null if it was not found.
 */
export const getAttributeValue = (attributes, id) => {
    const attribute = (attributes ?? []).find(attr => attr.attribute === id);
    return attribute?.value ?? null;
};

/**
 * Maps an array of attributes to an object using each attribute's code as the key.
 *
 * @param {Array} attributes - The array of attribute objects to map. Each object should have a 'code' property.
 * @returns {Object} An object where each key is an attribute code and each value is the corresponding attribute object.
 */
export const mapAttributesByCode = attributes => (attributes ?? []).reduce((acc, attribute) => {
    acc[attribute.code] = { ...attribute };
    return acc;
}, {});

/**
 * Retrieves the value of a specific attribute from a list of relationships
 * based on the tracked entity type and attribute id.
 *
 * @param {Array} relationships - The array of relationship objects to search through.
 * @param {String} trackedEntityType - The type of the tracked entity to filter relationships.
 * @param {String} attributeId - The id of the attribute to find within the filtered relationships.
 * @returns {String|Null} The value of the attribute with the given id, or null if not found.
 */
export const getAttributeFromRelationship = (
    relationships,
    trackedEntityType,
    attributeId,
) => {
    if (!relationships?.length || !trackedEntityType || !attributeId) {
        return null;
    }

    const attributes =
    relationships.find(
        rel => rel?.to?.trackedEntity.trackedEntityType === trackedEntityType,
    )?.to?.trackedEntity?.attributes ?? [];

    if (!attributes?.length) {
        return null;
    }

    const attribute = attributes.find(attr => attr?.attribute === attributeId);

    return attribute?.value ?? null;
};

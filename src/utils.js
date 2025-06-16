import { sortBy } from 'lodash/collection';
import { trimEnd, trimStart } from 'lodash';

import * as Icons from 'react-icons/fi';

export const getFilteredDashboards = (dashboards, filterStr) => {
    const filteredDashboards = filterStr
        ? dashboards.filter(d => d.name.toLowerCase().includes(filterStr.toLowerCase()))
        : dashboards;

    return sortBy(filteredDashboards, ['name']);
};

export const getAbsoluteUrl = (baseUrl, path) => {
    if (baseUrl) {
        return `${trimEnd(baseUrl, '/')}/${trimStart(path, '/')}`;
    }

    return path;
};

/**
 * Returns the icon component based on the icon name.
 * @param {string} iconName - The name of the icon to retrieve.
 * @returns {React.Component|null} The icon component or null if not found.
 */
export const getIcon = (iconName) => {
    const icon = Icons[iconName];
    if (!icon) {
        return null;
    }
    return icon;
};

import { sortBy } from 'lodash/collection';
import { trimEnd, trimStart } from 'lodash';

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

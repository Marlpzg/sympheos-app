import React, { useEffect, useState } from 'react';
import { CircularLoader } from '@dhis2/ui';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useUserLocale } from 'capture-core/utils/localeData/useUserLocale';
import { useDataStore } from '../../../hooks/useDataStore';
import menu from './menuOptions';
import { LinkTypes } from './constants';
import { getIcon } from '../../../utils';

const isActive = (location, item) => {
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

const buildMenuItemContent = (item, isCollapsed, locale) => {
    const Icon = getIcon(item.icon);

    return (<>
        {Icon && <Icon size={18} />}
        {!isCollapsed && <span>{item.title[locale] || item.title.default || item.id}</span>}
    </>);
};

const buildItemComponent = ({ location, isCollapsed, item, isHeader = true, locale = 'default' }) => {
    const padding = isHeader ? '0.5rem' : '0.25rem';

    if (item.link) {
        return (<Link
            to={item.link}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding,
                color: 'white',
                textDecoration: 'none',
                backgroundColor: isActive(location, item) ? '#374151' : 'transparent',
                borderRadius: '6px',
            }}
        >
            {buildMenuItemContent(item, isCollapsed, locale)}
        </Link>);
    }

    return (<div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding,
            fontWeight: isHeader ? 'bold' : 'normal',
            color: 'white',
        }}
    >
        {buildMenuItemContent(item, isCollapsed, locale)}
    </div>);
};

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [displayMenu, setDisplayMenu] = useState();
    const location = useLocation();
    const { locale } = useUserLocale();

    const { storeQuery, storeMutation } = useDataStore({ key: 'sympheosMenu', lazyGet: false });

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    useEffect(() => {
        if (storeQuery.loading || storeMutation.loading) {
            return;
        }

        if (storeQuery.data && storeQuery.data.results) {
            setDisplayMenu(storeQuery.data.results);
        } else {
            storeMutation.mutate({
                key: 'sympheosMenu',
                data: menu,
            });
            storeQuery.refetch({ key: 'sympheosMenu' });
        }
    }, [storeQuery, storeMutation]);

    return (
        <aside
            style={{
                width: isCollapsed ? '50px' : '240px',
                minWidth: isCollapsed ? '50px' : '240px',
                background: '#1f2937',
                color: 'white',
                maxHeight: '100%',
                padding: '0.5rem',
                transition: 'width 0.2s ease',
                marginRight: '1px',
                overflowY: 'auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: isCollapsed ? 'center' : 'flex-end',
                    marginBottom: '1rem',
                }}
            >
                <button
                    onClick={toggleCollapse}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                    }}
                >
                    {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
                </button>
            </div>

            {storeQuery.loading &&
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100px',
                        width: '100%',
                    }}
                >
                    <CircularLoader
                        size={24}
                        invert
                    />
                </div>
            }
            {!storeQuery.loading && displayMenu?.menu &&
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {displayMenu.menu.map(item => (
                        <li
                            key={item.id || item.title}
                            style={{
                                marginBottom: '0.5rem',
                                cursor: 'pointer',
                            }}
                        >
                            {buildItemComponent({
                                location,
                                isCollapsed,
                                item,
                                locale,
                            })}

                            {!isCollapsed && item.children && (
                                <ul className={'list_sidebar'}>
                                    {item.children.map(child => (
                                        <li
                                            key={child.id || child.title}
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {buildItemComponent({
                                                location,
                                                isCollapsed,
                                                item: child,
                                                isHeader: false,
                                                locale,
                                            })}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            }
        </aside>
    );
};

export default Sidebar;

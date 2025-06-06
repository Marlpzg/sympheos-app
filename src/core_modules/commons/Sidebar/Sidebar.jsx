import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { menu } from './menuOptions';
import { LinkTypes } from './constants';

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

const buildMenuItemContent = (item, isCollapsed) => {
    const Icon = item.icon;

    return (<>
        {Icon && <Icon size={18} />}
        {!isCollapsed && <span>{item.title}</span>}
    </>);
};

const buildItemComponent = (location, isCollapsed, item) => {
    const isHeader = item?.children?.length > 0;
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
            {buildMenuItemContent(item, isCollapsed)}
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
        {buildMenuItemContent(item, isCollapsed)}
    </div>);
};

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

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

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {menu.map(item => (
                    <li
                        key={item.key}
                        style={{
                            marginBottom: '0.5rem',
                            cursor: 'pointer',
                        }}
                    >
                        {buildItemComponent(location, isCollapsed, item)}

                        {!isCollapsed && item.children && (
                            <ul className={'list_sidebar'}>
                                {item.children.map(child => (
                                    <li
                                        key={child.key}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {buildItemComponent(location, isCollapsed, child)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;

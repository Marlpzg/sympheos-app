import { FiHome, FiCpu, FiSettings, FiBox, FiClipboard } from 'react-icons/fi'; /* https://feathericons.com/ */
import { LinkTypes } from './constants';

export const menu = [
    {
        id: 'overview',
        title: 'Overview',
        icon: FiHome,
        link: '/dashboard/overview',
        type: LinkTypes.SUPERSET,
    },
    {
        id: 'results',
        title: 'Results',
        key: 'results',
        icon: FiCpu,
        children: [
            {
                id: 'results_overview',
                title: 'Overview',
                link: '/dashboard/resultsOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                id: 'results_mpima_overview',
                title: 'M-PIMA Overview',
                link: '/dashboard/mPimaOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                id: 'results_mpima_data',
                title: 'M-PIMA Data',
                key: 'Fbb3mcEPeqP',
                link: '/?programId=Fbb3mcEPeqP&all',
                type: LinkTypes.CAPTURE,
            },
            {
                id: 'results_pima_overview',
                title: 'PIMA Overview',
                link: '/dashboard/pimaOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                id: 'results_pima_data',
                title: 'PIMA Data',
                key: 'wlOqXvONeU4',
                link: '/?programId=wlOqXvONeU4&all',
                type: LinkTypes.CAPTURE,
            },
        ],
    },
    {
        id: 'device_mng',
        title: 'Device Manager',
        key: 'device_mng',
        icon: FiClipboard,
        children: [
            {
                id: 'device_overview',
                title: 'Overview',
                link: '/dashboard/deviceOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                id: 'device_r1',
                title: 'Connect R1',
                key: 'emmnFREJ5n4',
                link: '/?programId=emmnFREJ5n4&all',
                type: LinkTypes.CAPTURE,
            },
            {
                id: 'device_netcom',
                title: 'NetCom',
                key: 'WoLFKfl21Om',
                link: '/?programId=WoLFKfl21Om&all',
                type: LinkTypes.CAPTURE,
            },
            {
                id: 'device_sms_printer',
                title: 'SMS Printer',
                key: 'JrKyubafFtp',
                link: '/?programId=JrKyubafFtp&all',
                type: LinkTypes.CAPTURE,
            },
            {
                id: 'device_pima',
                title: 'PIMA',
                key: 'vEK0nUEtkI6',
                link: '/?programId=vEK0nUEtkI6&all',
                type: LinkTypes.CAPTURE,
            },
            {
                id: 'device_mpima',
                title: 'M-PIMA',
                key: 'H8gFGCN7pgf',
                link: '/?programId=H8gFGCN7pgf&all',
                type: LinkTypes.CAPTURE,
            },
        ],
    },
    {
        id: 'stock_mng',
        title: 'Stock Manager',
        key: 'stock_mng',
        icon: FiBox,
        children: [
            {
                id: 'stock_overview',
                title: 'Overview',
                link: '/dashboard/stockOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                id: 'stock_movements',
                title: 'Movements',
                key: 'Q9kbGp9fDua',
                link: '/?programId=Q9kbGp9fDua&all',
                type: LinkTypes.CAPTURE,
            },
            {
                id: 'stock_products',
                title: 'Products',
                link: '/dashboard/stockProducts',
                type: LinkTypes.REDIRECT,
            },
        ],
    },
    {
        id: 'admin',
        title: 'Admin',
        key: 'admin',
        icon: FiSettings,
        children: [
            {
                id: 'admin_overview',
                title: 'Overview',
                link: '/dashboard/adminOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                id: 'admin_settings',
                title: 'Settings',
                link: '/settings',
                type: LinkTypes.NAVIGATE,
            },
            {
                id: 'admin_accounts',
                title: 'Accounts',
                key: 'accounts',
            },
            {
                id: 'admin_profiles',
                title: 'Profiles',
                key: 'profiles',
            },
            {
                id: 'admin_locations',
                title: 'Locations',
                key: 'locations',
            },
            {
                id: 'admin_users',
                title: 'Users',
                key: 'users',
            },
        ],
    },
];

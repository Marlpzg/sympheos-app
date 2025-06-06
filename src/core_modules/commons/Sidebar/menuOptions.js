import { FiHome, FiCpu, FiSettings, FiBox, FiClipboard } from 'react-icons/fi'; /* https://feathericons.com/ */
import { LinkTypes } from './constants';

export const menu = [
    {
        title: 'Overview',
        icon: FiHome,
        link: '/dashboard/overview',
        type: LinkTypes.SUPERSET,
    },
    {
        title: 'Diagnosis',
        key: 'diagnosis',
        icon: FiCpu,
        children: [
            {
                title: 'Overview',
                link: '/dashboard/diagnosisOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'M-PIMA Overview',
                link: '/dashboard/mPimaOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'M-PIMA Data',
                key: 'Fbb3mcEPeqP',
                link: '/?programId=Fbb3mcEPeqP&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'PIMA Overview',
                link: '/dashboard/pimaOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'PIMA Data',
                key: 'wlOqXvONeU4',
                link: '/?programId=wlOqXvONeU4&all',
                type: LinkTypes.CAPTURE,
            },
        ],
    },
    {
        title: 'Device Manager',
        key: 'device_mng',
        icon: FiClipboard,
        children: [
            {
                title: 'Overview',
                link: '/dashboard/deviceOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'Connect R1',
                key: 'emmnFREJ5n4',
                link: '/?programId=emmnFREJ5n4&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'NetCom',
                key: 'WoLFKfl21Om',
                link: '/?programId=WoLFKfl21Om&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'SMS Printer',
                key: 'JrKyubafFtp',
                link: '/?programId=JrKyubafFtp&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'PIMA',
                key: 'vEK0nUEtkI6',
                link: '/?programId=vEK0nUEtkI6&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'M-PIMA',
                key: 'H8gFGCN7pgf',
                link: '/?programId=H8gFGCN7pgf&all',
                type: LinkTypes.CAPTURE,
            },
        ],
    },
    {
        title: 'Stock Manager',
        key: 'stock_mng',
        icon: FiBox,
        children: [
            {
                title: 'Overview',
                link: '/dashboard/stockOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'Movements',
                key: 'Q9kbGp9fDua',
                link: '/?programId=Q9kbGp9fDua&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'Products',
                link: '/dashboard/stockProducts',
                type: LinkTypes.REDIRECT,
            },
        ],
    },
    {
        title: 'Admin',
        key: 'admin',
        icon: FiSettings,
        children: [
            {
                title: 'Overview',
                link: '/dashboard/adminOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'Settings',
                link: '/settings',
                type: LinkTypes.NAVIGATE,
            },
            {
                title: 'Accounts',
                key: 'accounts',
            },
            {
                title: 'Profiles',
                key: 'profiles',
            },
            {
                title: 'Locations',
                key: 'locations',
            },
            {
                title: 'Users',
                key: 'users',
            },
        ],
    },
];

import { FiHome, FiCpu, FiSettings, FiBox, FiClipboard } from 'react-icons/fi'; /* https://feathericons.com/ */
import { LinkTypes } from './constants';

export const menu = [
    {
        title: 'Overview',
        icon: FiHome,
        content: 'Superset dashboard overview',
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
                content: 'Superset diagnosis devices',
                link: '/dashboard/diagnosisOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'M-PIMA Overview',
                content: 'Superset M-PIMA',
                link: '/dashboard/mPimaOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'M-PIMA Data',
                key: 'Fbb3mcEPeqP',
                content: 'DHIS2 events',
                link: '/?programId=Fbb3mcEPeqP&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'PIMA Overview',
                content: 'Superset M-PIMA',
                link: '/dashboard/pimaOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'PIMA Data',
                key: 'wlOqXvONeU4',
                content: 'DHIS2 events',
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
                content: 'Superset dashboard connectivity dev',
                link: '/dashboard/deviceOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'Connect R1',
                key: 'emmnFREJ5n4',
                content: 'DHIS2 Capture Connect Program',
                link: '/?programId=emmnFREJ5n4&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'NetCom',
                key: 'WoLFKfl21Om',
                content: 'DHIS2 Caputre Netcom Program',
                link: '/?programId=WoLFKfl21Om&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'SMS Printer',
                key: 'JrKyubafFtp',
                content: 'DHIS2 Capture SMS Program',
                link: '/?programId=JrKyubafFtp&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'PIMA',
                key: 'vEK0nUEtkI6',
                content: 'DHIS2 Capture Pima Program',
                link: '/?programId=vEK0nUEtkI6&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'M-PIMA',
                key: 'H8gFGCN7pgf',
                content: 'DHIS2 Capture mPima Program',
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
                content: 'Superset',
                link: '/dashboard/stockOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'Movements',
                key: 'Q9kbGp9fDua',
                content: 'DHIS2 Program',
                link: '/?programId=Q9kbGp9fDua&all',
                type: LinkTypes.CAPTURE,
            },
            {
                title: 'Products',
                content: 'DHIS2 Option Set',
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
                content: 'Dashboard',
                link: '/dashboard/adminOverview',
                type: LinkTypes.SUPERSET,
            },
            {
                title: 'Accounts',
                key: 'accounts',
                content: 'DHIS2 Program',
            },
            {
                title: 'Profiles',
                key: 'profiles',
                content: 'DHIS2 Program',
            },
            {
                title: 'Locations',
                key: 'locations',
                content: 'Org Units',
            },
            {
                title: 'Users',
                key: 'users',
                content: 'User Mng',
            },
        ],
    },
];

export const DashboardStyles = {
    dashboardContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 64px)',
        width: '100%',
        backgroundColor: '#f4f6f8',
    },
    empty: {
        fontSize: '15px',
        fontWeight: 500,
        color: 'var(--colors-grey600)',
    },
    titleBar: {
        display: 'flex',
        fontSize: '21px',
        fontWeight: 500,
        alignItems: 'center',
        position: 'sticky',
        paddingTop: 'var(--spacers-dp12)',
        paddingBottom: 'var(--spacers-dp8)',
        paddingLeft: 'var(--spacers-dp16)',
        paddingRight: 'var(--spacers-dp16)',
    },
    actionsBar: {
        display: 'flex',
        marginLeft: 'var(--spacers-dp16)',
    },
    dashboardFrame: {
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    dashboardFrameIframe: {
        width: '100%',
        border: 'none',
    },
    hide: {
        display: 'none',
    },
    dashboardBar: {
        background: 'var(--colors-white)',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 6px 3px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        margin: 'auto',
        paddingLeft: 'var(--spacers-dp16)',
        paddingRight: 'var(--spacers-dp16)',
        paddingTop: 'var(--spacers-dp16)',
        paddingBottom: 'var(--spacers-dp8)',
    },
    chipsControls: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 'var(--spacers-dp16)',
    },
    chips: {
        display: 'flex',
        width: 'calc(100% - 300px)',
        flexWrap: 'wrap',
    },
    addDashboard: {
        paddingRight: 'var(--spacers-dp8)',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--colors-grey400)',
        width: '200px',
    },
    searchIcon: {
        marginRight: 'var(--spacers-dp4)',
    },
    searchField: {
        flexGrow: 1,
    },
    searchFieldInput: {
        width: '100%',
        border: 'none',
    },
    searchFieldInputFocus: {
        outline: 0,
        boxShadow: 'none',
        borderColor: 'transparent',
    },
    modalContent: {
        fontSize: '0.875rem',
        lineHeight: '1.5',
    },
    noticeContainer: {
        margin: 'var(--spacers-dp16)',
    },
    pt16: {
        paddingTop: 'var(--spacers-dp16)',
    },
};

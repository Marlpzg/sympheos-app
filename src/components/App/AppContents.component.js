
// @flow
import React, { memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { systemSettingsStore } from 'capture-core/metaDataMemoryStores';
import { FeedbackBar } from 'capture-core/components/FeedbackBar';
import { Sidebar } from 'commons/Sidebar';
import { AppPagesLoader } from './AppPagesLoader.component';

const getStyles = theme => ({
    app: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(16),
    },
});

type Props = {
    classes: {
        app: string,
    },
};

const Index = ({ classes }: Props) => (
    <div
        style={{
            display: 'flex',
            height: 'calc(100svh - 48px)',
            maxHeight: 'calc(100svh - 48px)',
            width: '100%',
            overflow: 'hidden',
        }}
    >
        <Sidebar />
        <div
            className={classes.app}
            dir={systemSettingsStore.get().dir}
            style={{
                width: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <AppPagesLoader />
            <FeedbackBar />
        </div>

    </div>

);
Index.displayName = 'AppContents';

export const AppContents = withStyles(getStyles)(memo(Index));

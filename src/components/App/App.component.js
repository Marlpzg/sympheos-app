// @flow
/* eslint-disable import/first */
import './app.css';
import React from 'react';
import { Provider } from 'react-redux';
import { AppContents } from './AppContents.component';
import {
    RulesEngineVerboseInitializer,
} from '../../core_modules/capture-core/components/RulesEngineVerboseInitializer';
import {
    MetadataAutoSelectInitializer,
} from '../../core_modules/capture-core/components/MetadataAutoSelectInitializer';

import { AppProvider } from '../../context';

type Props = {
    store: ReduxStore,
};

export const App = ({ store }: Props) => (
    <React.Fragment>
        <AppProvider>
            <Provider
                store={store}
            >
                <MetadataAutoSelectInitializer>
                    <RulesEngineVerboseInitializer>
                        <AppContents />
                    </RulesEngineVerboseInitializer>
                </MetadataAutoSelectInitializer>
            </Provider>
        </AppProvider>
    </React.Fragment>
);

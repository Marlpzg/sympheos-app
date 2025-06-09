// @flow
import React, { useState } from 'react';
import { AlertBar, AlertStack } from '@dhis2/ui';
import { Snackbar as SnackType, SnackbarContext } from './SnackbarContext';

export const SnackbarProvider = ({ children }) => {
    const [snackbars, setSnackbars] = useState([]);

    const showSnackbar = (snackbar) => {
        setSnackbars([...snackbars, snackbar]);
    };

    const handleClose = (index) => {
        const newSnackbars = [...snackbars];
        newSnackbars[index] = undefined;
        setSnackbars(newSnackbars);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <AlertStack className="flex-horizontal justify-start">
                {snackbars.map((snackbar: Snackbar, index) => {
                    if (snackbar) {
                        return (<AlertBar
                            // eslint-disable-next-line react/no-array-index-key
                            key={`${snackbar.key}${index}`}
                            onHidden={() => handleClose(index)}
                            duration={snackbar.duration}
                            permanent={!snackbar.duration}
                            critical={snackbar.severity === 'critical'}
                            warning={snackbar.severity === 'warning'}
                            success={snackbar.severity === 'success'}
                        >
                            {snackbar.message}
                        </AlertBar>);
                    }
                    return null;
                })}
            </AlertStack>
        </SnackbarContext.Provider>
    );
};
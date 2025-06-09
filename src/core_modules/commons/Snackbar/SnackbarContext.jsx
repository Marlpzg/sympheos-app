// @flow
import { createContext, useContext } from 'react';

export type Snackbar = {
    key: string;
    message: string;
    severity?: "success" | "critical" | "warning";
    duration?: number;
};

export const SnackbarContext = createContext(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

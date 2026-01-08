import { useEffect, useCallback } from 'react';

export const useUnsavedChanges = (isDirty: boolean, message: string = 'You have unsaved changes. Are you sure you want to leave?') => {
    const handleBeforeUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        },
        [isDirty, message]
    );

    useEffect(() => {
        if (isDirty) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, handleBeforeUnload]);
};

import { useCallback, useState } from 'react';

export const useTVFocus = (initialFocus = false) => {
    const [isFocused, setIsFocused] = useState(initialFocus);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    return {
        isFocused,
        focusProps: {
            onFocus: handleFocus,
            onBlur: handleBlur,
            hasTVPreferredFocus: initialFocus,
            isTVSelectable: true,
        }
    };
};
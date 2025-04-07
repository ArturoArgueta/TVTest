import { useCallback, useState } from 'react';

export const useTVFocus = () => {
    const [isFocused, setIsFocused] = useState(false);

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
            hasTVPreferredFocus: false,
            isTVSelectable: true,
        }
    };
}; 
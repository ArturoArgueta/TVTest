import React, { PropsWithChildren, useMemo } from "react";
import { ThemeProvider as EmotionProvider } from '@emotion/react'
import { useDeviceDimensions } from "../theme/src/hooks/useDeviceDimensions";
import { simpleTVTheme } from "../theme/src";

export const ThemeProvider : React.FC<PropsWithChildren> = ({children}) => {
    const { scale } = useDeviceDimensions()
    const theme = useMemo(() => {
        return simpleTVTheme(scale)
    }, [scale])
    return <EmotionProvider theme={theme}>{children}</EmotionProvider>

}
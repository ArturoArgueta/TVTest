import '@emotion/react'
import { SimpleTVTheme } from './theme/src';


declare module '@emotion/react' {
  export interface Theme extends SimpleTVTheme {}
}
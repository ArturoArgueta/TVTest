import { useCallback } from 'react';
import { useWindowDimensions} from 'react-native';
const BASE_WIDTH = 1200; // Reference width for scaling

export interface useDeviceDimensions{
    scale: (value: number, factor?: number) => number;
}

export const useDeviceDimensions  = () : useDeviceDimensions => {
    const {width} = useWindowDimensions();

    const scale = useCallback((value : number, factor = 0.4) => {
        return value + ((width / BASE_WIDTH) * value - value) * factor;
      },[width]);

      return{
        scale,
      };
};

import { Sizes } from '../../types/sizes';
import { useDeviceDimensions } from '../hooks/useDeviceDimensions';

export const sizes = (scale : useDeviceDimensions['scale']): Sizes => {
    return {
      xxxs: scale(4),
      xxs:  scale(8),
      xs:   scale(12),
      sm:   scale(16),
      md:   scale(20),
      lg:   scale(24),
      xl:   scale(28),
      xxl:  scale(32),
      xxxl: scale(36),
    };
  };

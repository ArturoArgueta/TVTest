import { useEffect } from "react";
import { useTVEventHandler, TVEventControl } from "react-native";

const useControlEvent = (onEvent: (event: string) => void) => {
  useTVEventHandler((event) => {
    if (event.eventType) {
      onEvent(event.eventType);
    }
  });

  useEffect(() => {
    TVEventControl.enableTVPanGesture();
    return () => TVEventControl.disableTVPanGesture();
  }, []);
};

export default useControlEvent;

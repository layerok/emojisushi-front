import { useEffect } from "react";

let mounted = false;

export const useBinotel = () => {
  useEffect(() => {
    if (mounted) {
      return;
    }
    const widgetHash = "sl9ot5v0k4azdxvojyis";
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = "//widgets.binotel.com/getcall/widgets/" + widgetHash + ".js";

    const allScripts = document.getElementsByTagName("script");

    allScripts[0].parentNode.insertBefore(script, allScripts[0]);
    mounted = true;
  }, []);
};

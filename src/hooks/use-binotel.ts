import { useEffect } from "react";

let initialized = false;

const BINOTEL_STYLE_TAG_ID = "binotel-styles";

export const useInitializeBinotel = () => {
  useEffect(() => {
    if (initialized) {
      return;
    }
    const widgetHash = "sl9ot5v0k4azdxvojyis";
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = "//widgets.binotel.com/getcall/widgets/" + widgetHash + ".js";

    const allScripts = document.getElementsByTagName("script");

    allScripts[0].parentNode.insertBefore(script, allScripts[0]);

    const style = document.createElement("style");
    style.innerHTML = `
      #bingc-phone-button, #bingc-active, #bingc-passive {
        display: none!important;
      }
    `;
    style.id = BINOTEL_STYLE_TAG_ID;

    document.head.appendChild(style);

    initialized = true;
  }, []);
};

export const useShowBinotel = () => {
  useEffect(() => {
    const style = document.head.querySelector(`#${BINOTEL_STYLE_TAG_ID}`);

    const prevStyles = style.innerHTML;
    style.innerHTML = "";

    return () => {
      style.innerHTML = prevStyles;
    };
  }, []);
};

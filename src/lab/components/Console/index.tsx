import { useEffect } from "react";

export const Console = ({ message, type = "log" }) => {
  useEffect(() => {
    console[type](message);
  }, [message]);

  return null;
};

Console.Log = ({ message }) => {
  return <Console type="log" message={message} />;
};

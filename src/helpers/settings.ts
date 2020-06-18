import settings from "electron-settings";
import { useState, useEffect } from "react";
import { remote } from "electron";
import _ from "lodash";

const app = remote.app;

export type Settings = {
  downloadFolder: string;
  autoLogin: boolean;
};

type DefaultSettings = Record<keyof Settings, () => any>;

const defaultSettings: DefaultSettings = {
  downloadFolder: () => {
    const path = app.getPath("downloads");
    return path;
  },
  autoLogin: () => {
    return false;
  },
};

export const useInitSettings = () => {
  const names = Object.keys(defaultSettings) as Array<keyof Settings>;
  return () => {
    names.map((name) => {
      settings.get(name).then((val) => {
        if (!val) {
          settings
            .set(name, defaultSettings[name]())
            .then(() => console.log("Set default setting", name))
            .catch((e) => console.error(e));
        } else {
          console.log("has setting", val);
        }
      });
    });
  };
};

export const useSetDefaultSettings = () => {
  const names = Object.keys(defaultSettings) as Array<keyof Settings>;
  console.log(JSON.stringify(defaultSettings), names);
  return () => {
    names.map((name) => {
      settings
        .set(name, defaultSettings[name]())
        .then(() => console.log("Set default setting", name))
        .catch((e) => console.error(e));
    });
  };
};

export const useSetting = (name: keyof Settings) => {
  const [originalValue, setValue] = useState<any>();
  settings.get(name).then((v) => {
    setValue(v);
  });
  return [
    originalValue,
    (value: string) => settings.set(name, value).then(() => setValue(value)),
  ];
};

export const useSettings = (): Partial<Settings> => {
  const names = Object.keys(defaultSettings) as Array<keyof Settings>;
  const [response, setResponse] = useState({});
  useEffect(() => {
    names.map(async (name) => {
      const value = await settings.get(name);
      let mySettings: Record<string, any> = defaultSettings;
      mySettings[name] = value;
      setResponse({ ...response, ...mySettings });
    });
  }, []);

  return response;
};

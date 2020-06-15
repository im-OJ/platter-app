import settings from "electron-settings";
import { useState } from "react";
import { remote } from "electron";
import _ from "lodash";

const app = remote.app;

type Settings = {
  downloadFolder: string;
  autoLogin: boolean;
};

type DefaultSettings = Record<keyof Settings, any>;
const defaultSettings: DefaultSettings = {
  downloadFolder: () => {
    console.log("downloads folder: " + app.getPath("downloads"));
    return app.getPath("downloads");
  },
  autoLogin: () => {
    return true;
  },
};

export const useInitSettings = () => {
  const names = Object.keys(defaultSettings) as Array<keyof Settings>;
  return () => {
    console.log("initialising settings");
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

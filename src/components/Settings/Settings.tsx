import * as React from "react";
import { Form, Typography } from "antd";
import { Page } from "../Page";
import { useSettings, Settings } from "../../helpers/settings";

export const SettingsPage = () => {
  const settings = useSettings();
  const settingNames = Object.keys(settings) as Array<keyof Settings>;
  console.log("SETTINGS NAMES:", settingNames);
  if (!settings || !settingNames) {
    return null;
  }
  return (
    <Page>
      <Form>
        {settings
          ? settingNames.map((name) => {
              console.log("got setting of type", typeof settings[name]);
              let ele = null;
              switch (typeof settings[name]) {
                case "string":
                  ele = (
                    <Typography>
                      {name} : {settings[name]}
                    </Typography>
                  );
                  break;
                  case "boolean":
                    ele = (
                      <Typography>
                        {name} : {settings[name]?.toString()}
                      </Typography>
                    );
                    break;
              }
              return ele;
            })
          : null}
      </Form>
    </Page>
  );
};

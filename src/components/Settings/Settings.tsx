import * as React from "react";
import { Form, Typography, Button } from "antd";
import { Page } from "../Page";
import { useSettings, Settings, useSetDefaultSettings } from '../../helpers/settings';

export const SettingsPage = () => {
  const settings = useSettings();
  const reset = useSetDefaultSettings()
  const settingNames = Object.keys(settings) as Array<keyof Settings>;
  if (!settings || !settingNames) {
    return null;
  }
  return (
    <Page>
      <Form>
        {settings
          ? settingNames.map((name) => {
              console.log("got setting " + name + ":", settings[name]);
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
          <Button 
            onClick={() => {
            reset() 
          }}>
            Reset
          </Button>
      </Form>
    </Page>
  );
};

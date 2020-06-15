import * as React from "react";
import { Form, Input, Typography } from "antd";
import { Page } from "../Page";
import { useSetting } from "../../helpers/settings";

export type Settings = {
  downloadFolder: string;
};

export const Settings = (props: any) => {
  const [downloadFolder] = useSetting("downloadFolder");
  return (
    <Page>
      <Form>
        <Form.Item>
          <Typography>path: {downloadFolder}</Typography>
          <Input type="text" />
        </Form.Item>
      </Form>
    </Page>
  );
};

import * as React from "react";
import { Page } from "../Page";

import { useUploadFiles } from "../../helpers/firebase-storage";
import Dragger from "antd/lib/upload/Dragger";
import { UploadFile } from "antd/lib/upload/interface";
import { EditSample } from "./components/EditSample";

export const Upload = () => {
  const { items, uploader } = useUploadFiles("samples");

  const handleFiles = (f: Array<UploadFile>) => {
    uploader(f);
  };

  return (
    <Page>
      <div
        style={{
          flex: 1,

          margin: "auto",
        }}
      >
        <Dragger
          style={{
            width: 200,
            height: 200,
            textAlign: "center",
            margin: "auto",
            padding: 20,
          }}
          multiple
          showUploadList={false}
          onChange={(e) => {
            handleFiles(e.fileList);
          }}
        />
        {items?.map((i) => (
          <EditSample
            uploadProgress={i.progress}
            key={i.name}
            onSampleUpdate={(s) => {}}
            sample={{
              name: i.name,
              url: i.url,
            }}
          />
        ))}
      </div>
    </Page>
  );
};

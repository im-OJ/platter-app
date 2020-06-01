import * as React from "react";
import { Page } from "../Page";

import { useFileUploader } from "../../helpers/firebase-storage";
import Dragger from "antd/lib/upload/Dragger";
import { UploadFile } from "antd/lib/upload/interface";

import { Sample } from "../Sample";
import { useState } from "react";
import { Alert } from "antd";

export const Upload = () => {
  const { item, uploader } = useFileUploader("samples");
  const [error, setError] = useState<string>();
  const handleFiles = (f: Array<UploadFile>) => {
    const files = f.filter((file) => {
      const isGood = file.type.startsWith("audio");
      if (!isGood) {
        setError("Bad file type :(");
      }
      return file.type.startsWith("audio");
    });
    if (files) {
      uploader(files[0]);
    }
  };
  console.log("item: " + item);
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
            width: "100%",
            textAlign: "center",
            margin: "auto",
            padding: 4,
          }}
          multiple
          customRequest={() => {}}
          showUploadList={false}
          onChange={(e) => {
            handleFiles(e.fileList);
          }}
        >
          Drop Samples Here
        </Dragger>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(undefined)}
          />
        )}

        <Sample
          options={{
            progress: item.progress,
            initalUpload: true,
          }}
          setError={setError}
          key={item.name}
          name={item.name}
          url={item.url ?? undefined}
        />
      </div>
    </Page>
  );
};

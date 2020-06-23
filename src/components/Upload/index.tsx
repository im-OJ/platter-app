import * as React from "react";
import { Page } from "../Page";

import { useUploadFiles } from '../../helpers/firebase-storage';
import Dragger from "antd/lib/upload/Dragger";
import { UploadFile } from "antd/lib/upload/interface";

import { Sample } from "../Sample";
import { useState } from "react";
import { Alert } from "antd";
import { useUsername } from "../StatusBar/StatusBar";

export const Upload = () => {
  const {items, uploader} = useUploadFiles("samples")
  const [error, setError] = useState<string>();
  const myUsername = useUsername();

  const handleFiles = (f: Array<UploadFile>) => {
    const files = f.filter((file) => {
      const isGood = file.type.startsWith("audio");
      if (!isGood) {
        setError("File is not audio");
      }
      return file.type.startsWith("audio");
    });
    if (files) {
      uploader(files);
    }
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

        {items?.map((item) => <Sample
          options={{
            progress: item.progress,
            initalUpload: true,
          }}
          filetype={item.filetype}
          setError={setError}
          key={item.name}
          name={item.name}
          username={myUsername ?? "no username"}
          userId={""}
          url={item.url ?? undefined}
        />)}
      </div>
    </Page>
  );
};

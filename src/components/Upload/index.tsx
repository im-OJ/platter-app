import * as React from "react";
import { Page } from "../Page";
import { useDropzone } from "react-dropzone";
import { useUploadFiles } from "../../Interaction/firebase-storage";

export const Upload = () => {
  const { getRootProps, getInputProps } = useDropzone();
  const { items, uploader } = useUploadFiles("samples");

  const handleFiles = (f: Array<File>) => {
    uploader(f);
  };

  return (
    <Page>
      <>
        <div
          {...getRootProps()}
          style={{
            width: "60%",
            height: 200,
          }}
        >
          <input
            {...getInputProps()}
            onChange={(e) => {
              console.log("on change!");
              if (!e.target.files) {
                return;
              }
              handleFiles(Array.from(e.target.files));
            }}
          />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <br />
        <div>
          {items &&
            items.map((i) => {
              return (
                <>
                  {i.name + ":" + i.progress} <br />
                </>
              );
            })}
        </div>
      </>
    </Page>
  );
};

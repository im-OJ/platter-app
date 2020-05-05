import firebase from "firebase";
import { useState, useEffect } from "react";
import _ from "lodash";

export const storage = () => firebase.storage();

export type FileUploadState = {
  name: string;
  progress: number;
  url: string | null;
};

const useFileUploader = (
  pathPrefix: string
): { uploader: (f: File) => void; item: FileUploadState; isBusy: boolean } => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  return {
    uploader: (file) => {
      console.log("uploading file", file.name);
      const myPathPrefix = pathPrefix.replace("/", "").replace(".", "");
      const uploadTask = storage()
        .ref(myPathPrefix + "/" + file.name)
        .put(file);
      uploadTask.on("state_changed", (snapshot) => {
        const myProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(myProgress);
        setIsBusy(true);
      });

      uploadTask.then((p) => {
        console.log("File upload complete");
        setUrl(p.downloadURL);
        setIsBusy(false);
      });
      console.log("upload state change ", progress);
    },
    item: { progress, name, url },
    isBusy,
  };
};

export const useUploadFiles = (
  pathPrefix: string
): { uploader: (files: Array<File>) => void } => {
  const {
    uploader: singleUploader,
    item: currentItem,
    isBusy,
  } = useFileUploader(pathPrefix);
  const [que, setQue] = useState<Array<File> | null>(null);

  const uploader = (files: Array<File>) => {
    setQue(que ? [...que, ...files.filter((f) => !que.includes(f))] : files);
    console.log("que length: " + que?.length);
  };

  useEffect(() => {
    console.log("que change / busy change", que);
    if (!isBusy) {
      if (!que) {
        return;
      }
      const latest = que.pop();
      if (!latest) {
        return;
      }
      singleUploader(latest);
    }
  }, [que, isBusy]);

  useEffect(() => {
    console.log("on item " + currentItem.name);
  }, [currentItem.name]);

  return { uploader };
};

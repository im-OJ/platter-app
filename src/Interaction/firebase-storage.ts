import firebase from "firebase";
import { useState, useEffect } from "react";
import _ from "lodash";
import { UploadFile } from "antd/lib/upload/interface";
import { useKeytar } from "../Interaction/keytar";
const uuid4 = require("uuid4");
export const storage = () => firebase.storage();

export type FileUploadState = {
  name: string;
  progress: number;
  url: string | null;
  id: string;
};

const useFileUploader = (
  pathPrefix: string
): {
  uploader: (f: UploadFile) => void;
  item: FileUploadState;
  isBusy: boolean;
} => {
  const [progress, setProgress] = useState(0);
  const { value: token } = useKeytar("token");
  const [url, setUrl] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [name, setName] = useState("");
  const id = uuid4();
  return {
    uploader: (uploadFile) => {
      const file = uploadFileToFile(uploadFile);
      if (!file) {
        return;
      }

      setName(file.name);
      const myPathPrefix = pathPrefix.replace("/", "").replace(".", "");
      const uploadTask = storage()
        .ref(myPathPrefix + "/" + file.name)
        .put(file, {
          customMetadata: {
            token: token ?? "no-token",
            id: id,
          },
        });
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
    },
    item: { progress, name, url, id },
    isBusy,
  };
};

export const useUploadFiles = (
  pathPrefix: string
): {
  uploader: (files: Array<UploadFile>) => void;
  items: Array<FileUploadState> | null;
} => {
  const {
    uploader: singleUploader,
    item: currentItem,
    isBusy,
  } = useFileUploader(pathPrefix);
  const [que, setQue] = useState<Array<UploadFile> | null>(null);
  const [items, setItems] = useState<Array<FileUploadState> | null>(null);
  const [myFiles, setMyFiles] = useState<Array<UploadFile> | null>(null);

  const uploader = (files: Array<UploadFile>) => {
    setMyFiles(files);
    setQue(que ? [...que, ...files.filter((f) => !que.includes(f))] : files);
  };

  useEffect(() => {
    // if que or isBusy changes
    // we call singleUploader with the next in que
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
    // if myFiles changes (aka when user selects files)
    // setItems to said files
    if (!myFiles) {
      return;
    }
    const i: Array<FileUploadState> = myFiles.reverse().map((f) => {
      return {
        name: f.name,
        progress: 0,
        url: null,
        id: "",
      };
    });
    // todo next: make i not include things already in items
    setItems(i);
  }, [myFiles]);

  useEffect(() => {
    // On Progress change update items to represent that
    if (!items) {
      console.error("Expected items but got none");
      return;
    }
    const newItems = items.map((i) => {
      // todo Use something other than name to check this
      if (i.name === currentItem.name) {
        return currentItem;
      } else {
        return i;
      }
    });
    setItems(newItems);
  }, [currentItem.progress]);

  // return function to upload and items (containing stats about upload)
  return { uploader, items };
};

const uploadFileToFile = (uf: UploadFile) => {
  const blob = uf.originFileObj;
  if (!blob) {
    return;
  }
  return new File([blob], uf.name);
};

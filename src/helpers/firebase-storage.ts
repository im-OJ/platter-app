import firebase from "firebase/app";
import "firebase/storage";
import { useState, useEffect } from "react";
import _ from "lodash";
import { UploadFile } from "antd/lib/upload/interface";

export const storage = () => firebase.storage();

export type FileUploadState = {
  name: string;
  progress: number;
  url: string | null;
  id: string;
  filetype: string;
};

export const useFileUploader = (
  pathPrefix: string
): {
  uploader: (f: MyUploadFile) => void;
  item: FileUploadState;
  isBusy: boolean;
} => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [name, setName] = useState("");
  const [filetype, setFiletype] = useState("");

  return {
    uploader: (uploadFile) => {
      const file = uploadFileToFile(uploadFile);
      if (!file) {
        return;
      }
      console.log(file.name.match(/\./g));
      if ((file.name.match(/\./g) || []).length != 1) {
        throw new Error("bad file type");
      }
      setName(file.name.split(".")[0]);
      setFiletype(file.name.split(".")[1]);
      const myPathPrefix = pathPrefix.replace("/", "").replace(".", "");
      const uploadTask = storage()
        .ref(myPathPrefix + "/" + file.name)
        .put(file, {
          customMetadata: {
            hello: "world",
          },
        });

      uploadTask.on("state_changed", (snapshot) => {
        const myProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(myProgress);
        setIsBusy(true);
      });

      uploadTask.then(async (p) => {
        const url = await p.ref.getDownloadURL();
        setUrl(url);
        if (!url) {
          console.error("no url");
          return;
        }

        setIsBusy(false);
      });
    },
    item: { progress: Math.round(progress), name, url, filetype, id: "todo" },
    isBusy,
  };
};

interface MyUploadFile extends UploadFile {
  tags?: Array<string>;
}

export const useUploadFiles = (
  pathPrefix: string
): {
  uploader: (files: Array<MyUploadFile>) => void;
  items: Array<FileUploadState> | null;
} => {
  const {
    uploader: singleUploader,
    item: currentItem,
    isBusy,
  } = useFileUploader(pathPrefix);
  const [que, setQue] = useState<Array<MyUploadFile> | null>(null);
  const [items, setItems] = useState<Array<FileUploadState> | null>(null);
  const [myFiles, setMyFiles] = useState<Array<MyUploadFile> | null>(null);

  const uploader = (files: Array<MyUploadFile>) => {
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
        name: f.name.split(".")[0],
        progress: 0,
        url: null,
        id: "",
        filetype: f.name.split(".")[1],
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

const uploadFileToFile = (uf: MyUploadFile) => {
  const blob = uf.originFileObj;
  if (!blob) {
    return;
  }
  console.log("name: " + uf.name);
  return new File([blob], uf.name);
};

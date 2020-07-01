import * as React from "react";
import { FileUploadState } from "@/helpers/firebase-storage";
import { Sample } from "../Sample";
import { useState } from "react";
import { useUsername } from '../StatusBar/StatusBar';
import { Alert } from 'antd';

export const UploadSamples = (props: { items: Array<FileUploadState> }) => {
  const [error, setError] = useState<string | null>(null)
  const username = useUsername()
  console.log("refrehs")
  return  <>
  
  {props.items.map((item) => <Sample
    options={{
      initalUpload: true,
    }}
    filetype={item.filetype}
    setError={setError}
    key={item.name}
    name={item.name}
    username={username ?? "no username"}
    userId={""}
    url={item.url ?? undefined}
  />)} 
  {error && <Alert message={error} type="error"/>}
  </>
};

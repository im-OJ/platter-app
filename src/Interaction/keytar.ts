import keytar from "keytar";
import { useState } from "react";

const setKeytar = (name: string, value: string | null) => {
  console.log("setting keytar ", name, value);
  if (!value) {
    keytar.deletePassword("main", name);
    return;
  }
  keytar.setPassword("main", name, value).catch(console.error);
};

const useGetKeytar = (name: string) => {
  const [value, setValue] = useState<string | null>(null);
  keytar
    .getPassword("main", name)
    .then((v) => setValue(v))
    .catch(console.error);
  return value;
};

export const useKeytar = (
  name: string
): [string | null, (value: string | null) => void] => {
  return [useGetKeytar(name), (value: string | null) => setKeytar(name, value)];
};

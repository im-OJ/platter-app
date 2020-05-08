import keytar from "keytar";
import { useState } from "react";

const setKeytar = (name: string, value: string | null) => {
  console.log("setting keytar ", name, value?.substr(0, 8));
  if (!value) {
    keytar.deletePassword("main", name);
    return;
  }
  keytar.setPassword("main", name, value).catch(console.error);
};

export const getKeytar = (name: string) => {
  return keytar.getPassword("main", name).catch(console.error);
};

export const useKeytar = (
  name: string
): {
  value: string | undefined;
  setValue: (value: string | null) => void;
  refresh: () => void;
} => {
  const [value, setValue] = useState<string>();

  const refresh = () =>
    getKeytar(name).then((e) => {
      if (e) {
        setValue(e);
      }
    });

  return {
    value,
    setValue: (value: string | null) => setKeytar(name, value),
    refresh,
  };
};

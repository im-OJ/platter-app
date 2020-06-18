import keytar from "keytar";
import { useState } from "react";

const setKeytar = (name: string, value: string | null) => {
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
  loading: boolean;
} => {
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState(true);
  const refresh = () => {
    getKeytar(name)
      .then((e) => {
        if (e) {
          setValue(e);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  refresh();
  return {
    value,
    setValue: (value: string | null) => setKeytar(name, value),
    refresh,
    loading,
  };
};

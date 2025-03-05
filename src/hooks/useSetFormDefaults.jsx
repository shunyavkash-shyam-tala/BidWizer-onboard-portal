import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

export default function useSetFormDefaults(
  defaultValues,
  setOnInitialRender = true
) {
  const { setValue } = useFormContext();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!defaultValues) return;

    if (setOnInitialRender) {
      if (!hasRun.current) {
        Object.entries(defaultValues).forEach(([key, value]) => {
          setValue(key, value);
        });
        hasRun.current = true;
      }
    } else {
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [defaultValues, setValue, setOnInitialRender]);
}

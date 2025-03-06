import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

export default function useSetFormDefaults(
  defaultValues,
  setOnInitialRender = true,
  externalSetValue
) {
  const formContext = useFormContext();
  const setValue = externalSetValue || formContext?.setValue;

  const hasRun = useRef(false);

  useEffect(() => {
    if (!defaultValues || !setValue) return;

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

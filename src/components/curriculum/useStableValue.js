import { useRef } from "react";

export function useStableValue(value) {
  const ref = useRef(value);
  const lastJson = useRef(null);

  let nextJson;
  try {
    nextJson = JSON.stringify(value);
  } catch {
    nextJson = null;
  }

  if (lastJson.current !== nextJson) {
    ref.current = value;
    lastJson.current = nextJson;
  }

  return ref.current;
}

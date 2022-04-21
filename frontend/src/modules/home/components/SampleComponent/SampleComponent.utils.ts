import { useCallback, useEffect, useState } from "react";

export const useMultipliedNum = (initialNum: number) => {
  const [num, setNum] = useState(initialNum);
  const [sampleState, setSampleState] = useState(false);

  useEffect(() => {
    setNum((num) => num + 1);
  }, [sampleState]);

  const handleClick = useCallback(() => {
    setSampleState(!sampleState);
  }, [sampleState]);

  return { num, handleClick };
};

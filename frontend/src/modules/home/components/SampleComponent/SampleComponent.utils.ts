import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../store";

export const useMultipliedNum = (initialNum: number) => {
  const [num, setNum] = useState<number>(initialNum);
  const [sampleState, setSampleState] = useState(false);

  useEffect(() => {
    setNum((num) => num + 1);
  }, [sampleState]);

  const handleClick = () => setSampleState((sampleState) => !sampleState);

  return { num, handleClick };
};

export const useReduxIncrement = () => {
  const dispatch = useDispatch();
  const number = useSelector(selectors.getDemoNumber);

  const handleIncrement = useCallback(
    () => dispatch(actions.incrementAction()),
    [dispatch]
  );
  const handleDcrement = useCallback(
    () => dispatch(actions.decrementAction()),
    [dispatch]
  );

  return { handleIncrement, handleDcrement, number };
};

import {useCallback, useMemo, useState} from 'react';

const useSort = (initialState = 1) => {
  const [increase, setStateIncrease] = useState(initialState);

  const toggle = useCallback(
      (state) => {
        if (increase === 1){
          console.log("state", -1);
          setStateIncrease(-1);
        }else{
          console.log("state", 1);
          setStateIncrease(1);
        }
      },
      [increase, setStateIncrease],
  );

  return useMemo(() => {
    return {
      increase,
      setStateIncrease,
      toggle,
    };
  }, [increase, setStateIncrease, toggle]);
};

export default useSort;

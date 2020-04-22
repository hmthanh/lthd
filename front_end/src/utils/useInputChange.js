import {useCallback, useMemo, useState} from 'react';

const useInputChange = (initialState) => {
  const [value, setValue] = useState(
      initialState !== undefined ? initialState : 0,
  );

  const onChange = useCallback((e) => {
    let target = e.target;
    let change = target.value;
    setValue(change);
  }, [setValue]);

  return useMemo(() => {
    return {
      value,
      setValue,
      onChange
    };
  }, [value, setValue, onChange]);
};

export default useInputChange;

import {useState, useCallback, useMemo} from 'react';

const useToggle = (initialState) => {
  const [active, setStateActive] = useState(
      initialState !== undefined ? initialState : false,
  );

  const setActive = useCallback(() => {
    setStateActive(true);
  }, []);

  const setInActive = useCallback(() => {
    setStateActive(false);
  }, []);

  const toggle = useCallback(
      (state) => {
        setStateActive(typeof state === 'boolean' ? state : !active);
      },
      [active],
  );

  return useMemo(() => {
    return {
      active,
      setActive,
      setInActive,
      toggle,
    };
  }, [active, setActive, setInActive, toggle]);
};

export default useToggle;

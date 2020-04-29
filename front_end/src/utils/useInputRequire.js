import {useCallback, useMemo, useState} from 'react';
import {required} from "./utils";


const useInputRequire = (initialState = {
  value: null,
  valid: false,
  invalid: false,
  inValidMsg: ""
}) => {
  const [value, setValue] = useState(initialState.value);
  const [valid, setValid] = useState(initialState.valid);
  const [invalid, setInValid] = useState(initialState.invalid);
  const [inValidMsg, setInValidMsg] = useState(initialState.inValidMsg);

  const onChange = useCallback((e) => {
    setValid(false);
    setInValid(false);
    setValue(e.target.value);
  }, [setValue]);

  const onBlur = useCallback((e) => {
    let val = e.target.value;
    if (!required(val)) {
      setInValid(true);
      setInValidMsg("Không được để trống");
    }else{
      setValid(true);
      setInValid(false);
      setTimeout(() =>{
        setValid(false);
      }, 2500);
    }
  }, [setInValid, setInValidMsg]);

  return useMemo(() => {
    return {
      value,
      setValue,
      onChange,
      valid,
      setValid,
      invalid,
      setInValid,
      inValidMsg,
      setInValidMsg,
      onBlur
    };
  }, [value, setValue, onChange, valid, setValid, invalid, setInValid, inValidMsg, setInValidMsg, onBlur]);
};

export default useInputRequire;

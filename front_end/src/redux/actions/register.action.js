import {REGISTER_DEFAULT, REGISTER_FAILED, REGISTER_LOADING, REGISTER_SUCCESS} from '../actionType'
import {UrlApi} from '../../shares/baseUrl';
import {fetchFrom} from '../../utils/fetchHelper'

export const register = (data) => {
  return (dispatch) => {
    dispatch({type: REGISTER_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/accounts', 'POST', data)
        console.log(response)
        dispatch({type: REGISTER_SUCCESS, payload: response});
        resolve(response)
      } catch (e) {
        dispatch({type: REGISTER_FAILED, payload: 'không thể kết nối đến server!!!'});
        console.log(e)
        reject(e)
      }
    })
    // return fetch(UrlApi + '/api/accounts', {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors',
    //   credentials: 'same-origin',
    //   headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   body: JSON.stringify(data)
    // }).then(response => response.json())
    // .then(response=>{
    //   console.log(response)
    //   dispatch(registerSuccess(response));
    // })
    // return fetchFrom(UrlApi + '/api/accounts', 'POST', data)
    //       .then(response => response.json())
    //       .then(response=>{
    //         console.log(response)
    //         dispatch(registerSuccess(response));
    //       }).catch(err => {
    //         console.log(err)
    //         dispatch(registerFailed());
    //       })
  };
}

export const registerLoading = () => ({
  type: REGISTER_LOADING
});


export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data
});

export const registerFailed = () => ({
  type: REGISTER_FAILED,
  payload: 'không thể kết nối đến server!!!'
});

export const backRegister = () => (dispatch) => {
  dispatch({
    type: REGISTER_DEFAULT
  })
};
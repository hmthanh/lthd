import {
  CREATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_SUCCESS,
  EMPLOYEE_FAILED,
  EMPLOYEE_LOADING,
  LOAD_EMPLOYEE_SUCCESS,
} from '../actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const fetchEmployee = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: EMPLOYEE_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/employee/all`, 'POST', {id: id}, accessToken);
        dispatch({type: LOAD_EMPLOYEE_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: EMPLOYEE_FAILED, payload: e});
      }
    });
  };
};


export const createEmployee = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: EMPLOYEE_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/admin/employee', 'POST', data, accessToken)
        dispatch({type: CREATE_EMPLOYEE_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: EMPLOYEE_FAILED, payload: e});
        reject(e);
      }
    })
  };
}


export const editEmployee = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: EMPLOYEE_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/employee', 'PATCH', data, accessToken);
        dispatch({type: EDIT_EMPLOYEE_SUCCESS, payload: response.item})
        console.log(response);
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: EMPLOYEE_FAILED, payload: e});
        reject(e);
      }
    })
  };
}


export const deleteEmployee = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: EMPLOYEE_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/employee', 'DELETE', {id: id}, accessToken);
        console.log(response);
        dispatch({type: DELETE_EMPLOYEE_SUCCESS, payload: response.item});
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: EMPLOYEE_FAILED, payload: e});
        reject(e);
      }
    })
  };
}


import {
    NAME_REMINISCENT_DELETED,
    NAME_REMINISCENT_EDIT,
    NAME_REMINISCENT_FAILED,
    NAME_REMINISCENT_LOADING,
    NAME_REMINISCENT_SUCCESS
} from '../actions/actionType'
import {UrlApi} from '../../shares/baseUrl'
import {fetchFrom} from '../../utils/fetchHelper'

export const Fetch = (id) => (dispatch) => {
    dispatch(Loading());
    return fetchFrom(UrlApi + `/api/receiver/${id}`, 'GET')
        .then(res => {
            console.log(res);
            Success(res.item)
        })
        .catch(err => {
            console.log(err);
            dispatch(ErrorAccount('không thể kết nối server'));
        })
};

export const Create = (data) => (dispatch) => {
    dispatch(Loading());
    return fetchFrom(UrlApi + '/api/receiver', 'POST', data)
        .then(response => {
            console.log(response);
            if (response.item) {
                fetchFrom(UrlApi + '/api/reminscent', 'POST', data)
                    .then(res => {
                        if (res.err !== 200) {
                            dispatch(ErrorAccount('Lỗi hệ thống'));
                        } else {
                            Success(res.item)
                        }
                    }).catch(err => {
                    console.log(err);
                    dispatch(ErrorAccount('không thể kết nối server'));
                })
            } else {
                dispatch(ErrorAccount('Tài Khoản Không Tồn Tại'));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(ErrorAccount('không thể kết nối server'));
        })
};

export const Edit = (data) => (dispatch) => {
    dispatch(Loading());
    return fetchFrom(UrlApi + '/api/reminscent', 'PATCH', data)
        .then(res => {
            if (res.err !== 200) {
                dispatch(ErrorAccount('Lỗi hệ thống'));
            } else {
                SuccessEdit(res.item)
            }
        }).catch(err => {
            console.log(err);
            dispatch(ErrorAccount('không thể kết nối server'));
        })
};

export const Delete = (id) => (dispatch) => {
    dispatch(Loading());
    return fetchFrom(UrlApi + '/api/reminscent', 'DELETE', id)
        .then(res => {
            if (res.err !== 200) {
                dispatch(ErrorAccount('Lỗi hệ thống'));
            } else {
                SuccessDelete(res.item)
            }
        }).catch(err => {
            console.log(err);
            dispatch(ErrorAccount('không thể kết nối server'));
        })
};

export const ErrorAccount = (msg) => ({
    type: NAME_REMINISCENT_FAILED,
    payload: msg
});

export const Loading = () => ({
    type: NAME_REMINISCENT_LOADING
});


export const Success = (data) => ({
    type: NAME_REMINISCENT_SUCCESS,
    payload: data
});

export const SuccessEdit = (data) => ({
    type: NAME_REMINISCENT_EDIT,
    payload: data
});

export const SuccessDelete = (data) => ({
    type: NAME_REMINISCENT_DELETED,
    payload: data
});
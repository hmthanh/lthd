libary sử dụng chính trong front end. ưu tiên dùng `reactstrap`
doccument đọc tại dây: \
[reactstrap](`https://reactstrap.github.io/components/collapse/`) \
[coreui](`https://coreui.io/docs/2.1/components/cards/`) 

các bước apply redux vào project. \
b1: tạo 1 page(component) \
b2: tạo các Action Type ở trong thư mục `/redux/action/actionType.js` cố gắng tạo theo `suffix` `_LOADING, _SUCCESS, _ERROR, _FAILED` trừ những trường hợp đặc biệt vd tên với suffix: `LOADING_CATEGORIES, LOADING_CATEGORIES_FAILSE, ADD_CATEGORIES ...`
b3: Định nghĩa các Action. Lưu ý quan trọng mỗi action tạo 1 file riêng và mẫu chung là như sau

```javascript
import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from './actionType'

export const Login = (state =  { isLoading: true,
    errMess: null,
    data:[]}, action) => {
    switch (action.type) {
        case LOGIN:
            return {isLoading: true, errMess: null, data: []};
        case LOGIN_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0,data: {...action.payload}}
        default:
            return state;
    }
};
```
b3: Định nghĩa các Action Creator. Lưu ý quan trọng mỗi action creator tạo 1 file riêng trong đó định nghĩa các function lấy fetch data, loading, loading err ví dụ như sau:
```javascript
export const login = (data) => (dispatch) => {
  dispatch(LoginLoading());
  return fetchFrom(UrlApi + '/api/auth', 'POST', data)
        .then(response => response.json())
        .then(response=>{
            // console.log(response)
            dispatch(LoginSuccess(response));
        })
        .catch(err => {
          console.log(err)
          dispatch(LoginFailed());
        })
}

export const LoginLoading = () => ({
  type: LOGIN
})


export const LoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
})

export const LoginFailed = () => ({
  type: LOGIN_FAILED,
  payload: 'không thể kết nối đến server!!!'
})
```
b4: combineReducers các action mình vừa định nghĩa vào đây.
```javascript
import {Login} from './actions/login'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Login: Login
        }),
        applyMiddleware(thunk),
    );

    return store;
}
```
b5: ở component, page phát sinh ra action cần thêm doạn code sau:
```javascript
const mapDispatchToProps = dispatch => ({
  login: (userName, password) => dispatch(login({userName, password})),
});

const mapStateToProps = (state) => {
  return {
    Login: state.Login,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
```

nếu có nhiều component khác page ảnh hưởng bởi data vd giỏ hàng thì cứ thêm vào `mapStateToProps` với điều kiện là trong `combineReducers` đã định nghĩa. trường hợp ở dưới là `combineReducers` phải có object card
```javascript
const mapStateToProps = (state) => {
  return {
    card: state.card,
  }
}
```
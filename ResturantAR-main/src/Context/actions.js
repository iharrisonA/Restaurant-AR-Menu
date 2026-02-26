import { getCustomers } from "../API";

export async function loginUser(dispatch, loginPayload) {
    let data = await getCustomers();
    let res = undefined;
    data.forEach(item => {
      if (item.email === loginPayload.email && item.password===loginPayload.password) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: item });
        localStorage.setItem('currentUser', JSON.stringify(item));
        res = item;
      }
    });
    if(res)
      return res;
    dispatch({ type: 'LOGIN_ERROR', error: "Invalid Username or Password!" });
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}
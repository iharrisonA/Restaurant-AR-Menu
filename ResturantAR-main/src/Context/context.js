import React, { useReducer } from 'react'
import { AuthReducer } from './reducer';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    return context;
}
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
    return context;
}
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, localStorage.getItem('currentUser'));
 
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
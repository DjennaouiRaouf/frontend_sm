import {createContext, ReactNode, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: any;
  setAuthenticated: (newState: any) => void
}

const initialValue = {
  authenticated: Cookies.get("token"),
  setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({children}: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated)

  const navigate = useNavigate()

  useEffect(() => {
    const token:any=Cookies.get("token");
    if(token){
      setAuthenticated(token)
    }
  },[authenticated]);

  return (
      <AuthContext.Provider value={{authenticated, setAuthenticated}}>
        {children}
      </AuthContext.Provider>
  )
}

export {  AuthContext, AuthProvider }
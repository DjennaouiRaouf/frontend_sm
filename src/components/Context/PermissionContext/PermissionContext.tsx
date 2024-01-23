import {createContext, ReactNode, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";

type Props = {
  children?: ReactNode;
}

type IPermContext = {
    permission: string[];
    setPermission: (newState: any) => void
}

const initialValue = {
    permission: String(Cookies.get('role')).split('|'),
    setPermission: () => {}
}


const PermissionContext = createContext<IPermContext>(initialValue)

const PermissionProvider = ({children}: Props) => {
  //Initializing an Perm state with false value (unPermenticated)
  const [ permission, setPermission ] = useState(initialValue.permission)
  const getPermissions = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/permission/`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
            Cookies.set('role',response.data.role);
            setPermission(String(Cookies.get('role')).split('|'))


        })
        .catch((error:any) => {

        });

  }
  useEffect(() => {
   getPermissions()

  },[permission]);

  return (
      <PermissionContext.Provider value={{permission, setPermission}}>
        {children}
      </PermissionContext.Provider>
  )
}

export {  PermissionContext, PermissionProvider }
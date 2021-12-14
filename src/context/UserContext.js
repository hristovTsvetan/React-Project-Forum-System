import { useReducer, createContext, useEffect } from "react";
import { authObj } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";

export const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, user: action.payload };
      case "LOGOUT":
        return { ...state, user: action.payload };
      case "UPDATE_USER":
        return { ...state, user: action.payload };
      case "AUTH_IS_READY":
        return { ...state, user: action.payload, isAuthReady: true };
      default:
        return state;
    }
}


export function UserProvider({children}) {
    const {getDocument} = useFirestore('users');
    const [state, dispatch] = useReducer(userReducer, {
        user: null,
        isAuthReady: false,
    });

    console.log('User context state is:', state);

    const updateAction = (user) => {
      dispatch({type: 'UPDATE_USER', payload: user});
  };

    const loginAction = (user) => {
        dispatch({type: 'LOGIN', payload: user});
    };

    const logoutAction = () => {
        dispatch({type: 'LOGOUT', payload: null});
    };

    const authIsReady = (user) => {
        dispatch({type: 'AUTH_IS_READY', payload: user})
    }

    useEffect(() => {
        const unsub = authObj.onAuthStateChanged(async (user) => {
           
          const getRole = async () => {
            const curUser = await getDocument(user.uid);
            const userRole = curUser?.role;
            authIsReady({...user, role: userRole});
          }

          if(user !== null) {
            await getRole();
          } else {
            authIsReady(user);
          }

          unsub();
        })
    }, [])


    return (
      <UserContext.Provider value={{ ...state, loginAction, logoutAction, updateAction }}>
        {children}
      </UserContext.Provider>
    );
}

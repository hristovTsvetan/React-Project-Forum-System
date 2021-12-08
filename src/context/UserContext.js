import { useReducer, createContext, useEffect } from "react";
import { authObj } from "../firebase/config";

export const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, user: action.payload };
      case "LOGOUT":
        return { ...state, user: action.payload };
      case "AUTH_IS_READY":
        return { ...state, user: action.payload, isAuthReady: true };
      default:
        return state;
    }
}


export function UserProvider({children}) {

    const [state, dispatch] = useReducer(userReducer, {
        user: null,
        isAuthReady: false,
    });

    console.log('User context state is:', state);

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
        const unsub = authObj.onAuthStateChanged((user) => {
            authIsReady(user);
            unsub();
        })
    }, [])


    return (
      <UserContext.Provider value={{ ...state, loginAction, logoutAction }}>
        {children}
      </UserContext.Provider>
    );
}

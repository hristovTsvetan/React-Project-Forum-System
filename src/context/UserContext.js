import { createContext } from "react";
import { useReducer } from "react";

export const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            return {...state, uid: action.payload};
            break;
    
        default:
            break;
    }
}


export function UserProvider({children}) {

    const [state, dispatch] = useReducer(userReducer, {
        uid: '',
        role: 'User',
        displayName: '',
    });

    const setUserId = (uid) => {
        dispatch({type: 'SET_USER_ID', payload: uid});
    }

    return (
        <UserContext.Provider value={{...state, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}

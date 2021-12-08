import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { authObj } from "../firebase/config";

export function useLogout() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)
    const {logoutAction} = useUser();
    //for cleanup function
    const [isCanceled, setIsCanceled] = useState(false);

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try{
            await authObj.signOut();

            //dispatch
            logoutAction();
            
            if(!isCanceled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch(err) {           
            if(!isCanceled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCanceled(true);
        }
    }, [])

    return {error, isPending, logout};
}

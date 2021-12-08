import { useState, useEffect } from "react";
import { authObj } from "../firebase/config";
import { useUser } from "./useUser";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {loginAction} = useUser();
    //for cleanup function
    const [isCanceled, setIsCanceled] = useState(false);

    const signup = async (email, password, displayName, repeatPassword) => {
        setError(null);
        setIsPending(true);

        try {

            if(repeatPassword !== password) {
                throw new Error("Passwords are different!");
            }

            const response = await authObj.createUserWithEmailAndPassword(email, password);
            console.log(response);
            
            if(!response) {
                throw new Error("Signup fail!");
            }

            await response.user.updateProfile({displayName});

            //dispatch login action
            loginAction(response.user);

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

    return {signup, error, isPending};
}
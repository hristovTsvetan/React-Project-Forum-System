import { useState } from "react";
import { authObj } from "../firebase/config";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

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

            setIsPending(false);
            setError(null);
        } 
        catch(err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    }

    return {signup, error, isPending};
}
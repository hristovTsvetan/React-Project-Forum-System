import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { authObj } from "../firebase/config";
import { useFirestore } from "./useFirestore";

export function useLogin() {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)
    const {loginAction} = useUser();
    //for cleanup function
    const [isCanceled, setIsCanceled] = useState(false);
    const {getDocument, updateDocument} = useFirestore('users');

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try{
            const res = await authObj.signInWithEmailAndPassword(email, password);

            if(!res) {
                throw new Error('Something wrong with login!');
            }

            const userDb = await getDocument(res.user.uid);

            await updateDocument(res.user.uid, {online: true});

            //dispatch
            loginAction({...res.user, role: userDb.role});
            
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

    return {error, isPending, login};
}

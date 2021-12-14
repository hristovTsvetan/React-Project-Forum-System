import { useState, useEffect } from "react";
import { authObj, firestoreObj } from "../firebase/config";
import { useUser } from "./useUser";
import { firebaseStorage } from "../firebase/config";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {loginAction} = useUser();
    //for cleanup function
    const [isCanceled, setIsCanceled] = useState(false);

    const signup = async (email, password, displayName, repeatPassword, thumbnail) => {
        setError(null);
        setIsPending(true);

        try {

            if(repeatPassword !== password) {
                throw new Error("Passwords are different!");
            }

            const response = await authObj.createUserWithEmailAndPassword(email, password);
            
            if(!response) {
                throw new Error("Signup fail!");
            }

            //upload user thumbnail
            const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`;
            const img = await firebaseStorage.ref(uploadPath).put(thumbnail);
            const imgUrl = await img.ref.getDownloadURL();

            await response.user.updateProfile({displayName, photoURL: imgUrl});

            //create user document
            await firestoreObj.collection('users').doc(response.user.uid).set({
                role: 'user',
                displayName,
                id: response.user.uid,
                photoURL: imgUrl,
            });

            //dispatch login action
            loginAction({...response.user, role: 'user', photoURL: imgUrl,});

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
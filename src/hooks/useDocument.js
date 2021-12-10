import { useState, useEffect } from "react";
import { firestoreObj } from "../firebase/config";




export function useDocument(collection, ids) {
    const [document, setDocument] = useState(null);
    const [error, setError] =  useState(null);


   useEffect(() => {
       const ref = firestoreObj.collection(collection).doc(ids);

        const unsubscribe = ref.onSnapshot((snapshot) => {
            setDocument({...snapshot.data(), id: snapshot.id})
            setError(null);
        }, (err) => {
            console.log(err.message);
            setError(err.message);
        } 
        )

       return () => unsubscribe()
   }, [collection, ids]);

   return {document, error};
    
}

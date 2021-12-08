import { useState, useEffect } from "react";
import { firestoreObj } from "../firebase/config";

export const useCollection = (collection) => {
  const [error, setError] = useState(null);
  const [documents, setDocument] = useState(null);

  useEffect(() => {
    let ref = firestoreObj.collection(collection);
    const unsubscribe = ref.onSnapshot((snapshot) => {
        let result = [];
        snapshot.docs.forEach(doc => {
            result.push({...doc.data(), id: doc.id});
        });

        //update document
        setDocument(result);
        setError(null);
    }, (error) => {
        console.log(error);
        setError(error.message);
    });

    return () => {
        unsubscribe()
    };
  }, [collection]);

  return {documents, error};
}
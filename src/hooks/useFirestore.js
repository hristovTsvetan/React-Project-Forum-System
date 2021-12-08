import { firestoreObj, timestamp } from "../firebase/config";
import { useState, useEffect, useReducer } from "react";

let initialState = {
    document: null,
    error: null,
    isPending: false,
    success: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
      case "IS_PENDING":
        return { isPending: true, document: null, success: false, error: null };
      case "ADDED_DOCUMENT":
        return {
          isPending: false,
          document: state.payload,
          success: true,
          error: null,
        };
      case "ERROR":
        return {
          error: action.payload,
          isPending: false,
          document: null,
          success: false,
        };
      case "DELETED_DOCUMENT":
        return {
          error: null,
          isPending: false,
          document: action.payload,
          success: true,
        };
      case "UPDATE_DOCUMENT":
        return {
          error: null,
          isPending: false,
          document: action.payload,
          success: true,
        };
      default:
        return state;
    }
}

export const useFirestore = (collection) => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [response, dispatch] = useReducer(firestoreReducer, initialState);

    //collection ref
    const ref = firestoreObj.collection(collection);

    //if not canceled
    const dispatchIfNotCanceled = (action) => {
        if(!isCanceled) {
            dispatch(action);
        }
    };

    //add doc 
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'});

        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({...doc, createdAt});
            dispatchIfNotCanceled({type: 'ADDED_DOCUMENT', payload: addedDocument});
        }
        catch(err) {
            dispatchIfNotCanceled({type: 'ERROR', payload: err.message});
        }
    };

    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'});

        try {
            const deletedDocument = await ref.doc(id).delete();
            dispatchIfNotCanceled({type: 'DELETED_DOCUMENT', payload: deletedDocument});
        }
        catch(error) {
            dispatchIfNotCanceled({type: 'ERROR', payload: 'Could not delete'});
        }
    };

    const getDocument = async (id) => {

        try {
            const document = await ref.doc(id).get()

            return document.data();
        }
        catch(err) {
            dispatchIfNotCanceled({type: 'ERROR', payload: err.message});

            return null;
        }
    }

    const updateDocument = async (id, updates) => {
        dispatch({type: 'IS_PENDING'});

        try {
            const updatedDocument = await ref.doc(id).update(updates);
            dispatchIfNotCanceled({type: 'UPDATE_DOCUMENT', payload: updatedDocument});
        }
        catch(err) {
            dispatchIfNotCanceled({type: 'ERROR', payload: err.message});
        }
    }

    //cleanup
    useEffect(() => {
        return () => {
            setIsCanceled(true);
        }
    }, [])

    return {addDocument, deleteDocument, getDocument, updateDocument, response};
}
import { createContext, useReducer } from "react";

export const ModalContext = createContext();

const modalReducer = (state, action) => {
    switch (action.type) {
        case 'EDIT_CATEGORY':
        {
            if(action.payload === true) {
                return {...state, editCategory: action.payload, modal: true}
            }
            return {...state, editCategory: action.payload, modal: false};
        }
        case 'DELETE_CATEGORY':
        {
            if(action.payload === true) {
                return {...state, deleteCategory: action.payload, modal: true}
            }
            return {...state, deleteCategory: action.payload, modal: false};
        }
        case 'DELETE_SUBCATEGORY':
        {
            if(action.payload === true) {
                return {...state, deleteSubcategory: action.payload, modal: true}
            }
            return {...state, deleteSubcategory: action.payload, modal: false};
        }
        default:
            return state;
    }
}

export function ModalProvider({ children }) {
    const [state, dispatch] = useReducer(modalReducer, {
        deleteCategory: false,
        editCategory: false,
        deleteSubcategory: false,
        editSubcategory: false,
        modal: false,
    });

    const editCategoryAction = (editCategory) => {
        dispatch({type: 'EDIT_CATEGORY', payload: editCategory});
    }

    const deleteCategoryAction = (deleteCategory) => {
        dispatch({type: 'DELETE_CATEGORY', payload: deleteCategory});
    };

    const deleteSubCategoryAction = (deleteSubCategory) => {
        dispatch({type: 'DELETE_SUBCATEGORY', payload: deleteSubCategory});
    }

    return (
      <ModalContext.Provider
        value={{
          ...state,
          editCategoryAction,
          deleteCategoryAction,
          deleteSubCategoryAction,
        }}
      >
        {children}
      </ModalContext.Provider>
    );
}
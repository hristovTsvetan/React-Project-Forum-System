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
        case 'EDIT_SUBCATEGORY':
        {
            if(action.payload === true) {
                return {...state, editSubcategory: action.payload, modal: true}
            }
            return {...state, editSubcategory: action.payload, modal: false};
        }
        case 'CREATE_CATEGORY':
        {
            if(action.payload === true) {
                return {...state, createCategory: action.payload, modal: true}
            }
            return {...state, createCategory: action.payload, modal: false};
        }
        case 'CREATE_SUBCATEGORY':
        {
            if(action.payload === true) {
                return {...state, createSubcategory: action.payload, modal: true}
            }
            return {...state, createSubcategory: action.payload, modal: false};
        }
        case 'EDIT_POST':
        {
            if(action.payload === true) {
                return {...state, editPost: action.payload, modal: true}
            }
            return {...state, editPost: action.payload, modal: false};
        }
        case 'DELETE_POST':
        {
            if(action.payload === true) {
                return {...state, deletePost: action.payload, modal: true}
            }
            return {...state, deletePost: action.payload, modal: false};
        }
        case 'DELETE_COMMENT':
        {
            if(action.payload === true) {
                return {...state, deleteComment: action.payload, modal: true}
            }
            return {...state, deleteComment: action.payload, modal: false};
        }
        case 'CREATE_POST':
        {
            if(action.payload === true) {
                return {...state, createPost: action.payload, modal: true}
            }
            return {...state, createPost: action.payload, modal: false};
        }
        case 'SET_ID':
        {
            return {...state, itemId: action.payload};
        }
        default:
            return state;
    }
}

export function ModalProvider({ children }) {
    const [state, dispatch] = useReducer(modalReducer, {
        deleteComment: false,
        deleteCategory: false,
        editCategory: false,
        deleteSubcategory: false,
        editSubcategory: false,
        createCategory: false,
        createSubcategory: false,
        editPost: false,
        deletePost: false,
        createPost: false,
        modal: false,
        itemId: null
    });

    const editCategoryAction = (editCategory, id) => {
        dispatch({type: 'SET_ID', payload: id});
        dispatch({type: 'EDIT_CATEGORY', payload: editCategory});
    }

    const deleteCategoryAction = (deleteCategory, id) => {
        dispatch({type: 'SET_ID', payload: id});
        dispatch({type: 'DELETE_CATEGORY', payload: deleteCategory});
    };

    const deleteSubCategoryAction = (deleteSubCategory, id) => {
        dispatch({type: 'SET_ID', payload: id});
        dispatch({type: 'DELETE_SUBCATEGORY', payload: deleteSubCategory});
    };

    const editSubCategoryAction = (editSubCategory, id) => {
        dispatch({type: 'SET_ID', payload: id});
        dispatch({type: 'EDIT_SUBCATEGORY', payload: editSubCategory});
    };

    const createCategoryAction = (createCategory) => {
        dispatch({type: 'CREATE_CATEGORY', payload: createCategory});
    };

    const createSubcategoryAction = (createSubcategory) => {
        dispatch({type: 'CREATE_SUBCATEGORY', payload: createSubcategory});
    };

    const editPostAction = (editPost, id) => {
        dispatch({type: 'SET_ID', payload: id});
        dispatch({type: "EDIT_POST", payload: editPost});
    }

    const deletePostAction = (deletePost, id) => {
        dispatch({type: 'SET_ID', payload: id});
        dispatch({type: "DELETE_POST", payload: deletePost});
    }

    const deleteCommentAction = (deleteComment, id) => {
        dispatch({type: 'SET_ID', payload: id});
        dispatch({type: "DELETE_COMMENT", payload: deleteComment});
    }

    const createPostAction = (createPost) => {
        dispatch({type: "CREATE_POST", payload: createPost});
    }

    return (
      <ModalContext.Provider
        value={{
          ...state,
          editCategoryAction,
          deleteCategoryAction,
          deleteSubCategoryAction,
          editSubCategoryAction,
          createCategoryAction,
          createSubcategoryAction,
          createPostAction,
          deletePostAction,
          editPostAction,
          deleteCommentAction,
        }}
      >
        {children}
      </ModalContext.Provider>
    );
}
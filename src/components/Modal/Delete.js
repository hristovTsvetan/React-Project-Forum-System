import { useModal } from "../../hooks/useModal"
import { useFirestore } from "../../hooks/useFirestore";

export default function Delete() {
    const {
        deleteCategoryAction,
        deleteSubCategoryAction,
        deletePostAction,
        deletePost,
        deleteSubcategory,
        deleteCategory,
        itemId,

    } = useModal();
    const {deleteDocument} = useFirestore('categories');

    let deleteMessage = null;

    deletePost && (deleteMessage = 'Are you sure that you want to delete post?');
    deleteSubcategory && (deleteMessage = 'Are you sure that you want to delete subcategory?');
    deleteCategory && (deleteMessage = 'Are you sure that you want to delete category?');

    const handleClick = () => {
        if(deleteCategory) {
            deleteDocument(itemId);
            deleteCategoryAction(false, null)
        }
    }

    return (
        <>
            <p>
                {deleteMessage}
            </p>
            <div className="modal-buttons-delete">
                <button className="delete-agree-btn" onClick={handleClick}>Yes</button>
                <button className="delete-disagree-btn" onClick={() => {
                    deleteCategoryAction(false, null);
                    deleteSubCategoryAction(false);
                    deletePostAction(false);
                }}>No</button>
            </div>
        </>
    )
}

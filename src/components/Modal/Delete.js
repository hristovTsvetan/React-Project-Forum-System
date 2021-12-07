import { useModal } from "../../hooks/useModal"

export default function Delete() {
    const {
        deleteCategoryAction,
        deleteSubCategoryAction,
        deletePostAction,
        deletePost,
        deleteSubcategory,
        deleteCategory,
    } = useModal();

    let deleteMessage = false;

    deletePost && (deleteMessage = 'Are you sure that you want to delete post?');
    deleteSubcategory && (deleteMessage = 'Are you sure that you want to delete subcategory?');
    deleteCategory && (deleteMessage = 'Are you sure that you want to delete category?');

    return (
        <>
            <p>
                {deleteMessage}
            </p>
            <div className="modal-buttons-delete">
                <button className="delete-agree-btn">Yes</button>
                <button className="delete-disagree-btn" onClick={() => {
                    deleteCategoryAction(false);
                    deleteSubCategoryAction(false);
                    deletePostAction(false);
                }}>No</button>
            </div>
        </>
    )
}

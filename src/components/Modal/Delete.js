import { useModal } from "../../hooks/useModal"
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";

export default function Delete() {
    const {
        deleteCategoryAction,
        deleteSubCategoryAction,
        deletePostAction,
        deleteCommentAction,
        deletePost,
        deleteSubcategory,
        deleteCategory,
        deleteComment,
        itemId,

    } = useModal();
    const {deleteDocument, updateDocument, getDocument} = useFirestore('categories');
    const history = useHistory();

    let deleteMessage = null;

    deletePost && (deleteMessage = 'Are you sure that you want to delete post?');
    deleteSubcategory && (deleteMessage = 'Are you sure that you want to delete subcategory?');
    deleteCategory && (deleteMessage = 'Are you sure that you want to delete category?');
    deleteComment && (deleteMessage = 'Are you sure that you want to delete comment?');

    const handleClick = async () => {
        if(deleteCategory) {
            deleteDocument(itemId);
            deleteCategoryAction(false, null)
        }
        else if(deleteSubcategory) {
             const origDoc = await getDocument(itemId.parentId);
             
             delete origDoc.subCategories[itemId.id];

             await updateDocument(itemId.parentId, origDoc)

            deleteSubCategoryAction(false, null);
        }
        else if(deletePost) {
            const origDoc = await getDocument(itemId.catId);

            delete origDoc.subCategories[itemId.subId].posts[itemId.id];

            await updateDocument(itemId.catId, origDoc);

            deletePostAction(false, null);
        }
        else if(deleteComment) {
            const categoryId = itemId.catId;
            const subCategoryId = itemId.subId;
            const postId = itemId.postId;
            
            const origDoc = await getDocument(itemId.catId);

            delete origDoc.subCategories[itemId.subId].posts[itemId.postId].comments[itemId.commentId];

            await updateDocument(itemId.catId, origDoc);

            deleteCommentAction(false, null);
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
                    deleteSubCategoryAction(false, null);
                    deletePostAction(false, null);
                    deleteCommentAction(false, null);
                }}>No</button>
            </div>
        </>
    )
}

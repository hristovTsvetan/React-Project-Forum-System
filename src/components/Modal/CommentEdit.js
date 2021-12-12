import "./CommentEdit.css"

import { useState} from "react";
import { useModal } from "../../hooks/useModal";
import { useFirestore } from "../../hooks/useFirestore";

export default function CommentEdit() {
    const [newContent, setNewContent] = useState(null);
    const {itemId, editCommentAction} = useModal();
    const {getDocument, updateDocument} = useFirestore('categories');
    const [categoryId, setCategoryId] = useState('');
    const [subCatId, setSubCatId] = useState('');
    const [postId, setPostId] = useState('');
    const [commentId, setCommentId] = useState('');


    const onChangeHandler = (e) => {
        setNewContent(e.currentTarget.value);
        !categoryId && setCategoryId(itemId.catId);
        !subCatId && setSubCatId(itemId.subCatId);
        !postId && setPostId(itemId.postId);
        !commentId && setCommentId(itemId.commentId);

        itemId.comment && editCommentAction(true, {comment: null});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const curDoc = await getDocument(categoryId);


        const curComment = curDoc.subCategories[subCatId].posts[postId].comments[commentId];
        curComment.content = newContent;

        await updateDocument(categoryId, curDoc);

        editCommentAction(false, {comment: null});
    }

    return (
      <form className="edit-comment-wrapper" onSubmit={submitHandler}>
        <label>
          <span>Edit comment body:</span>
          <textarea
            cols="30"
            rows="10"
            onChange={onChangeHandler}
            value={itemId?.comment !== null ? itemId.comment : newContent}
            required
          ></textarea>
        </label>
        <div className="modal-change-button-wrapper controls-edit-comment">
          <button className="modal-edit-chang-btn">Change</button>
          <button className="modal-edit-cancel-btn" onClick={() => editCommentAction(false, null)}>Cancel</button>
        </div>
      </form>
    );
}

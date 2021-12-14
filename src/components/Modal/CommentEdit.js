import "./CommentEdit.css"

import { useState, useEffect} from "react";
import { useModal } from "../../hooks/useModal";
import { useFirestore } from "../../hooks/useFirestore";

export default function CommentEdit() {
    const [newContent, setNewContent] = useState('');
    const {itemId, editCommentAction} = useModal();
    const {getDocument, updateDocument} = useFirestore('categories');
    const [categoryId, setCategoryId] = useState('');
    const [subCatId, setSubCatId] = useState('');
    const [postId, setPostId] = useState('');
    const [commentId, setCommentId] = useState('');

    useEffect(() => {
      setNewContent(itemId?.comment);
    }, [itemId?.comment])

    useEffect(() => {
      setCategoryId(itemId.catId);
      setSubCatId(itemId.subCatId);
      setPostId(itemId.postId);
      setCommentId(itemId.commentId);
    }, [itemId.postId])

    const onChangeHandler = (e) => {
        setNewContent(e.currentTarget.value);
        //itemId.comment && editCommentAction(true, {comment: null});
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
            value={newContent}
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

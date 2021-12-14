import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useUser } from "../../hooks/useUser";

import './Post.css';

export default function Post({postInfo}) {
  const {deletePostAction, editPostAction} = useModal();
  const {user} = useUser();

    return (
      <>
        <div className="post-title-wrapper">
          <Link
            className="post-link"
            to={`/comments/${postInfo.categoryId}/${postInfo.subCategoryId}/${postInfo.id}`}
          >
            <div className="post-name">
              <p className="post-title">{postInfo.postTitle}</p>
            </div>
          </Link>
        </div>
        <div className="post-icons">
          {user && (postInfo.uid === user.uid || user.role === 'admin') &&
            <div className="edit-icon-wrapper">
              <Link
                to={`/posts/${postInfo.categoryId}/${postInfo.subCategoryId}`}
                onClick={() =>
                  editPostAction(true, {
                    catId: postInfo.categoryId,
                    subId: postInfo.subCategoryId,
                    id: postInfo.id,
                  })
                }
              >
                <i className="fas fa-edit"></i>
              </Link>
            </div>
          }
          {user && user.role === "admin" && (
            <div className="delet-icon-wrapper">
              <Link
                to={`/posts/${postInfo.categoryId}/${postInfo.subCategoryId}`}
                onClick={() =>
                  deletePostAction(true, {
                    catId: postInfo.categoryId,
                    subId: postInfo.subCategoryId,
                    id: postInfo.id,
                  })
                }
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          )}
        </div>
        <div className="post-replies-number">
          <p>
            {Object.values(postInfo.comments).length}{" "}
            {Object.values(postInfo.comments).length <= 1
              ? "comment"
              : "comments"}
          </p>
        </div>
      </>
    );
}

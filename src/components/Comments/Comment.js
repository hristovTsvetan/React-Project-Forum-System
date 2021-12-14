import "./Comment.css";

import { useUser } from "../../hooks/useUser";
import { Link } from "react-router-dom";
import LikeDislike from "./LikeDislike";
import { useModal } from "../../hooks/useModal";

export default function Comment({comment, dbUsers}) {
  const {deleteCommentAction, editCommentAction} = useModal();
  const {user} = useUser();

  return (
    <>
      <article className="comment-wrapper">
        <section className="comment-user-info">
          <h4>{dbUsers && dbUsers[comment.uid].displayName}</h4>
          <div className="comment-avatar-wrapper">
            <img src={dbUsers && dbUsers[comment.uid].photoURL} alt="User avatar" />
          </div>
          <p className="comment-user-role">{dbUsers && dbUsers[comment.uid].role}</p>
        </section>
        <section className="comment-content">
          <div className="comment-header">
            <p className="comment-date">
              {comment.createdAt.toDate().toString()}
            </p>
            <div className="comment-like-dislike">
              {user && <LikeDislike comment={comment} />}
              {!comment.isFirstComment && user && user.role === 'admin' &&
                <div className="delete-post">
                  <Link
                    to="#"
                    onClick={() =>
                      deleteCommentAction(true, {
                        catId: comment.categoryId,
                        subId: comment.subCategoryId,
                        postId: comment.postId,
                        commentId: comment.id,
                      })
                    }
                  >
                    <i className="fas fa-trash"></i>
                  </Link>
                </div>
              }
              {user && (comment.uid === user.uid || user.role === "admin") && (
                <div className="edit-comment">
                  <Link
                    to="#"
                    onClick={() => {
                      editCommentAction(true, {
                        comment: comment.content,
                        commentId: comment.id,
                        catId: comment.categoryId,
                        subCatId: comment.subCategoryId,
                        postId: comment.postId,
                      });
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.content}</p>
          </div>
        </section>
      </article>
    </>
  );
}

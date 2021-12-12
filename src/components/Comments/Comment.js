import "./Comment.css";

import avatarLogo from "./Assets/honda-avatar.svg";

import { Link } from "react-router-dom";
import LikeDislike from "./LikeDislike";
import { useModal } from "../../hooks/useModal";

export default function Comment({comment}) {
  const {deleteCommentAction} = useModal();

  return (
    <>
      <article className="comment-wrapper">
        <section className="comment-user-info">
          <h4>{comment.owner}</h4>
          <div className="comment-avatar-wrapper">
            <img src={avatarLogo} alt="User avatar" />
          </div>
          <p className="comment-user-role">User</p>
        </section>
        <section className="comment-content">
          <div className="comment-header">
            <p className="comment-date">
              {comment.createdAt.toDate().toString()}
            </p>
            <div className="comment-like-dislike">
              <LikeDislike comment={comment} />
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

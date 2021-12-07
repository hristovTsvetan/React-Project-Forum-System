import "./Comment.css";

import avatarLogo from "./Assets/honda-avatar.svg";

import { Link } from "react-router-dom";

export default function Comment() {
  return (
    <>
      <article className="comment-wrapper">
        <section className="comment-user-info">
          <h4>Ceco</h4>
          <div className="comment-avatar-wrapper">
            <img src={avatarLogo} alt="User avatar" />
          </div>
          <p className="comment-user-role">User</p>
        </section>
        <section className="comment-content">
          <div className="comment-header">
            <p className="comment-date">21.10.2012</p>
            <div className="comment-like-dislike">
              <div className="comment-like">
                <Link to="#">
                  <i className="far fa-thumbs-up"></i>
                </Link>
                <p className="comment-like-dislike-counter">10</p>
              </div>
              <div className="comment-like comment-dislike">
                <Link to="#">
                  <i className="far fa-thumbs-down"></i>
                </Link>
                <p className="comment-like-dislike-counter">7</p>
              </div>
              <div className="delete-post">
                <Link to="#">
                  <i className="fas fa-trash"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="comment-body">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non</p>
          </div>
        </section>
      </article>
    </>
  );
}

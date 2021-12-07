import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import './Post.css';

export default function Post() {

  const {deletePostAction, editPostAction} = useModal();

    return (
      <>
        <div className="post-title-wrapper">
          <Link className="post-link" to="/posts/catId/subId/postId">
            <div className="post-name">
              <p className="post-title">My honda stop working</p>
            </div>
          </Link>
        </div>
        <div className="post-icons">
          <div className="edit-icon-wrapper">
            <Link to="/category/categoryid/subcategoryid" onClick={() => editPostAction(true)}>
              <i className="fas fa-edit"></i>
            </Link>
          </div>
          <div className="delet-icon-wrapper">
            <Link to="/category/categoryid/subcategoryid" onClick={() => deletePostAction(true)}>
              <i className="fas fa-trash-alt"></i>
            </Link>
          </div>
        </div>
        <div className="post-replies-number">
          <p>10 replies</p>
        </div>
      </>
    );
}

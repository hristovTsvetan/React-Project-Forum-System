import './Path.css';
import { Link } from 'react-router-dom';

export default function Path({
  categoryName,
  subCategoryName,
  postName,
  catId,
  subCatId,
  postId,
}) {

  return (
    <div className="post-header-wrapper">
      <Link to="/">
        <span className="category-title">{categoryName}</span>
      </Link>
      <span className="category-subcategory-delimiter">/</span>
      <Link to={`/posts/${catId}/${subCatId}`}>
        <span className="category-title">{subCategoryName}</span>
      </Link>
      {postName && (
        <>
          <span className="category-subcategory-delimiter">/</span>
          <Link to={`/comments/${catId}/${subCatId}/${postId}`}>
            <span className="category-title">{postName}</span>
          </Link>
        </>
      )}
    </div>
  );
}

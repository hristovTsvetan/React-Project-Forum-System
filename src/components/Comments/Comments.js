import Comment from "./Comment";

import "./Comments.css";


export default function Comments() {
    return (
      <>
        <div className="post-header-wrapper">
          <span className="category-title">Category name</span>
          <span className="category-subcategory-delimiter">/</span>
          <span className="category-title">Subcategory name</span>
          <span className="category-subcategory-delimiter">/</span>
          <span className="category-title">Post name</span>
        </div>
        <section className="comments-wrapper">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </section>
      </>
    );
}

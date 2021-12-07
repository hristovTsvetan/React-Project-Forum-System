import { Link } from "react-router-dom";
import Post from "./Post"

import './Posts.css';

export default function Posts() {
    return (
      <>
      <div className="category-title-wrapper">
            <span className="category-title">Category name</span>
            <span className="category-subcategory-delimiter">/</span>
            <span className="category-title">Subcategory name</span>
          </div>
      <section className="category posts">
        <article className="posts-wrapper">
          <Post />
          <Post />
          <Post />
          <Post />
        </article>
      </section>
      </>
    );
}

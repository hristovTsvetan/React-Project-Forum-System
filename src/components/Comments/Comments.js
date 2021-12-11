import Comment from "./Comment";
import {useDocument} from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import "./Comments.css";

export default function Comments() {
  const [comments, setComments] = useState(null);
  const {catId, subId, postId} = useParams();
  const {document, error} = useDocument('categories', catId);
  const [isCanceled, setIsCanceled] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [postName, setPostName] = useState('');
  const { user } = useUser();

  useEffect(() => {

    if(!isCanceled) {
      document &&
      setComments(
        Object.values(
          document.subCategories[subId].posts[postId].comments
        ).sort((a, b) => b.createdAt.toDate() + a.createdAt.toDate())
      );

      document && setCategoryName(document.title);
      document && setSubCategoryName(document.subCategories[subId].subCategoryName);
      document && setPostName(document.subCategories[subId].posts[postId].postTitle);
      
    }
      return () => {
        setIsCanceled(true);
      }
  }, [document])

    return (
      <>
        <div className="post-header-wrapper">
          <span className="category-title">{categoryName}</span>
          <span className="category-subcategory-delimiter">/</span>
          <span className="category-title">{subCategoryName}</span>
          <span className="category-subcategory-delimiter">/</span>
          <span className="category-title">{postName}</span>
        </div>
        {user && <div className="create-post-wrappper">
          <Link to={`/CreateComment/${catId}/${subId}/${postId}`} className="add-comment">Add comment</Link>
        </div>
        }
        <section className="comments-wrapper">
          {comments && comments.map((com) => <Comment key={com.id} comment={com} />)}
        </section>
      </>
    );
}

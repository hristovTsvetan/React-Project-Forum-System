import Comment from "./Comment";
import Path from "../Path/Path";
import {useDocument} from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import "./Comments.css";
import { useFirestore } from "../../hooks/useFirestore";

export default function Comments() {
  const [dbUsers, setDbUsers] = useState(null);
  const {catId, subId, postId} = useParams();
  const {document, error} = useDocument('categories', catId);
  const [isCanceled, setIsCanceled] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [postName, setPostName] = useState('');
  const { user } = useUser();
  const {getDocuments} = useFirestore('users');
  const _getDocuments = useRef(getDocuments).current;
  

  useEffect(() => {

    const fetchData = async () => {
      const result =  await _getDocuments();
      setDbUsers(result);
    }
    
    fetchData();
    
  }, [_getDocuments])

  useEffect(() => {

    if(!isCanceled) {
      document && setCategoryName(document.title);
      document &&
        setSubCategoryName(document.subCategories[subId].subCategoryName);
      document &&
        setPostName(document.subCategories[subId].posts[postId].postTitle);
    }

      return () => {
        setIsCanceled(true);
      }
  }, [document])

    return (
      <>
        <Path
          categoryName={categoryName}
          subCategoryName={subCategoryName}
          postName={postName}
        />
        {user && (
          <div className="create-post-wrappper">
            <Link
              to={`/CreateComment/${catId}/${subId}/${postId}`}
              className="add-comment"
            >
              Add comment
            </Link>
          </div>
        )}
        <section className="comments-wrapper">
          {document &&
            Object.values(document.subCategories[subId].posts[postId].comments)
              .sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate())
              .map((com) => <Comment key={com.id} comment={com} dbUsers={dbUsers}/>)}
        </section>
      </>
    );
}

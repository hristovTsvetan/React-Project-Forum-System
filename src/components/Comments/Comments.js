import Comment from "./Comment";
import Path from "../Path/Path";
import {useDocument} from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import Pagination from "../Pagination/Pagination";
import { useTitle } from "../../hooks/useTitle";

import "./Comments.css";
import { useFirestore } from "../../hooks/useFirestore";

export default function Comments() {
  const [dbUsers, setDbUsers] = useState(null);
  const {catId, subId, postId} = useParams();
  const {document} = useDocument('categories', catId);
  const [isCanceled, setIsCanceled] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [postName, setPostName] = useState('');
  const { user } = useUser();
  const {getDocuments} = useFirestore('users');
  const _getDocuments = useRef(getDocuments).current;
  const [currentPage, setCurrentPage] = useState(1);
  useTitle('Honda forum - comments');

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = document && Math.ceil(
    Object.values(document.subCategories[subId].posts[postId].comments).length /
      itemsPerPage
  );

  //when delete last comment from any poge
  useEffect(() => {
    document && totalPages < currentPage && setCurrentPage(totalPages);
  }, [totalPages]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await _getDocuments();
      setDbUsers(result);
    };

    fetchData();
  }, [_getDocuments]);

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
  }, [document, postId, subId, isCanceled]);


  const handleCurrentPage = (curPage) => {
    setCurrentPage(curPage);
  }

    return (
      <>
        <Path
          categoryName={categoryName}
          subCategoryName={subCategoryName}
          postName={postName}
          catId={catId}
          subCatId={subId}
          postId={postId}
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
              .slice(startIndex, startIndex + itemsPerPage)
              .map((com) => (
                <Comment key={com.id} comment={com} dbUsers={dbUsers} />
              ))}
          <Pagination
            totalPages={totalPages}
            handleCurrentPage={handleCurrentPage}
            currentPage={currentPage}
          />
        </section>
      </>
    );
}

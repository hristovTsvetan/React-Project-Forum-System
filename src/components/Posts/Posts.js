import Post from "./Post";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";
import Path from "../Path/Path";
import Pagination from "../Pagination/Pagination";

import './Posts.css';
import { useUser } from "../../hooks/useUser";
import { useTitle } from "../../hooks/useTitle";


export default function Posts() {
  const {categoryid, subcategoryid} = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const {getDocument, } = useFirestore('categories');
  const {document} = useDocument('categories', categoryid);
  const [isCanceled, setIsCanceled] = useState(false);
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  useTitle('Honda forum - posts');
  
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages =
    document &&
    Math.ceil(
      Object.values(document.subCategories[subcategoryid].posts).length /
        itemsPerPage
    );

      //when delete last comment from any poge
  useEffect(() => {
    document && totalPages < currentPage && setCurrentPage(totalPages);
  }, [totalPages]);

  useEffect(() => {
    const setData = async () => {
      const curCategory = await getDocument(categoryid);

      const curSubCategory = curCategory.subCategories[subcategoryid];
  
      if(!isCanceled) {
        setCategoryName(curSubCategory.category);
        setSubCategoryName(curSubCategory.subCategoryName);
      }
    }

    setData();

    return () => {
      setIsCanceled(true);
    }
  }, [categoryid, subcategoryid]);

  const handleCurrentPage = (curPage) => {
    setCurrentPage(curPage);
  }

  return (
    <>
      {document && (
        <>
          <Path
            categoryName={categoryName}
            subCategoryName={subCategoryName}
            catId={categoryid}
            subCatId={subcategoryid}
          />
          {user && (
            <div className="add-post">
              <Link to={`/CreatePost/${categoryid}/${subcategoryid}`}>
                Add post
              </Link>
            </div>
          )}
          <section className="category posts">
            <article className="posts-wrapper">
              {document &&
                Object.values(document.subCategories[subcategoryid].posts)
                  .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
                  .slice(startIndex, startIndex + itemsPerPage)
                  .map((post) => <Post key={post.id} postInfo={post} />)}
              {document && totalPages === 0 && (
                <p className="info-message">
                  There is no posts at this category!
                </p>
              )}
            </article>
            <Pagination className="pagination"
              totalPages={totalPages}
              handleCurrentPage={handleCurrentPage}
              currentPage={currentPage}
            />
          </section>
        </>
      )}
    </>
  );
}

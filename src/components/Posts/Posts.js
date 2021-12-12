import PostsList from "./PostsList";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";
import Path from "../Path/Path";

import './Posts.css';
import { useUser } from "../../hooks/useUser";


export default function Posts() {
  const {categoryid, subcategoryid} = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const {getDocument, } = useFirestore('categories');
  const {document} = useDocument('categories', categoryid);
  const [isCanceled, setIsCanceled] = useState(false);
  const { user } = useUser();
 
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
  }, [categoryid, subcategoryid])

  return (
    <>
      {document && (
        <>
          <Path categoryName={categoryName} subCategoryName={subCategoryName} />
          {user && (
            <div className="add-post">
              <Link to={`/CreatePost/${categoryid}/${subcategoryid}`}>
                Add post
              </Link>
            </div>
          )}
          <section className="category posts">
            <article className="posts-wrapper">
              {document && (
                <PostsList
                  allPosts={Object.values(
                    document.subCategories[subcategoryid].posts
                  )}
                />
              )}
              {document &&
                Object.values(document.subCategories[subcategoryid].posts)
                  .length === 0 && (
                  <p className="info-message">
                    There is no posts at this category!
                  </p>
                )}
            </article>
          </section>
        </>
      )}
    </>
  );
}

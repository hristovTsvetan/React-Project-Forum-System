import PostsList from "./PostsList";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";

import './Posts.css';
import { useUser } from "../../hooks/useUser";


export default function Posts() {
  const {categoryid, subcategoryid} = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const {getDocument, } = useFirestore('categories');
  const {document} = useDocument('categories', categoryid);
  const { user } = useUser();
 
  useEffect(() => {

    const setData = async () => {
      const curCategory = await getDocument(categoryid);

      const curSubCategory = curCategory.subCategories[subcategoryid];
  
      setCategoryName(curSubCategory.category);
      setSubCategoryName(curSubCategory.subCategoryName);

    }

    setData();
  }, [categoryid, subcategoryid])

  return (
    <>
      {document && (
        <>
          <div className="category-title-wrapper">
            <span className="category-title">{categoryName}</span>
            <span className="category-subcategory-delimiter">/</span>
            <span className="category-title">{subCategoryName}</span>
          </div>

          {user &&<div className="add-post">
            <Link to={`/CreatePost/${categoryid}/${subcategoryid}`}>
              Add post
            </Link>
          </div>
          }
          <section className="category posts">
            <article className="posts-wrapper">
              
              {document && <PostsList allPosts = {Object.values(document.subCategories[subcategoryid].posts)}/>}
              {document && Object.values(document.subCategories[subcategoryid].posts).length === 0  && <p className="info-message">There is no posts at this category!</p>}
            </article>
          </section>
        </>
      )}
    </>
  );
}

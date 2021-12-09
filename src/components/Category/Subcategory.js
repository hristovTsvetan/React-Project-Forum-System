import "./Subcategory.css";

import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import React from "react";

export default function Subcategory({subCategories}) {
  const {deleteSubCategoryAction, editSubCategoryAction} = useModal();

  return (
    <>
      {Object.values(subCategories)
        .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
        .map((val) => (
          <React.Fragment key={val.id}>
            <Link
              className="sub-category-link"
              to={`/posts/${val.parentId}/${val.id}`}
            >
              <div className="subcategory-name">
                <p className="subcategory-title">{val.subCategoryName}</p>
                <p className="subcategory-description">
                  {val.subCategoryDescription}
                </p>
              </div>
            </Link>
            <div className="subcategory-icons">
              <Link to="/" onClick={() => editSubCategoryAction(true, {parentId: val.parentId, id: val.id})}>
                <div className="edit-icon-wrapper">
                  <i className="fas fa-edit"></i>
                </div>
              </Link>
              <Link to="/" onClick={() => deleteSubCategoryAction(true, {parentId: val.parentId, id: val.id})}>
                <div className="delet-icon-wrapper">
                  <i className="fas fa-trash-alt"></i>
                </div>
              </Link>
            </div>
            <div className="subcategory-pub-number">
              <p>{Object.values(val.posts).length} posts</p>
            </div>
          </React.Fragment>
        ))}
    </>
  );
}

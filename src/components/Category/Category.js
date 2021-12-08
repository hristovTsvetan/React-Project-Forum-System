import "./Category.css";

import Subcategory from "./Subcategory";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

export default function Category({category}) {
  const {editCategoryAction, deleteCategoryAction} = useModal();
  
    return (
      <>
        <section className="category">
          <div className="admin-category-wrapper">
            <Link to="/" onClick={() => editCategoryAction(true, category.id)}>
              <i className="fas fa-edit"></i>
            </Link>
            <Link to="/" onClick={() => deleteCategoryAction(true, category.id)}>
              <i className="fas fa-trash"></i>
            </Link>
          </div>
          <div className="category-title-wrapper">
            <span className="category-title">{category.title}</span>
          </div>
          <article className="subcategory-wrapper">
            <Subcategory />
            <Subcategory />
            <Subcategory />
          </article>
        </section>
      </>
    );
}
import "./Category.css";

import Subcategory from "./Subcategory";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

export default function Category({name}) {
    
  const {editCategoryAction, deleteCategoryAction} = useModal();

    return (
      <>
        <section className="category">
          <div className="admin-category-wrapper">
            <Link to="/" onClick={() => editCategoryAction(true)}>
              <i className="fas fa-edit"></i>
            </Link>
            <Link to="/" onClick={() => deleteCategoryAction(true)}>
              <i className="fas fa-trash"></i>
            </Link>
          </div>
          <div className="category-title-wrapper">
            <span className="category-title">{name}</span>
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
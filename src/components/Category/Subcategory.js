import "./Subcategory.css";

import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

export default function Subcategory() {
  const {deleteSubCategoryAction, editSubCategoryAction} = useModal();

  return (
    <>
      <Link className="sub-category-link" to="/category/categoryid/subcategoryid">
        <div className="subcategory-name">
          <p className="subcategory-title">Honda Civic</p>
          <p className="subcategory-description">
            Everything about honda civic
          </p>
        </div>
      </Link>
      <div className="subcategory-icons">
        <Link to="/" onClick={() => editSubCategoryAction(true)}>
          <div className="edit-icon-wrapper">
            <i className="fas fa-edit"></i>
          </div>
        </Link>
        <Link to="/" onClick={() => deleteSubCategoryAction(true)}>
          <div className="delet-icon-wrapper">
            <i className="fas fa-trash-alt"></i>
          </div>
        </Link>
      </div>
      <div className="subcategory-pub-number">
        <p>1010 publications</p>
      </div>
    </>
  );
}
